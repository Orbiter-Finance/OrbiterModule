import { sleep } from 'orbiter-chaincore/src/utils/core';
import { Mutex } from "async-mutex";
import { sendTxConsumeHandle } from "./maker";

type Message = {
    id: string;
    data: any;
};

export class MessageQueue {
    private messages: Message[] = [];
    private consumedIds: Set<string> = new Set();
    private mutex = new Mutex();
    constructor(method: Function) {
        this.consumeQueue(method)
    }
    public async enqueue(id: string, data: any) {
        await this.mutex.runExclusive(async () => {
            if (this.consumedIds.has(id)) {
                console.log(`Message ${id} has already been consumed.`);
                return;
            }
            this.messages.push({ id, data });
            console.log(`Message ${id} has been enqueued.`);
        });
    }
    public size() {
        return this.messages.length;
    }
    public async dequeue(method: Function) {
        let result: any = null;
        if (this.messages.length <= 0) {
            return result;
        }
        await this.mutex.runExclusive(async () => {
            while (this.messages.length > 0 && this.consumedIds.has(this.messages[0].id)) {
                this.messages.shift();
            }
            if (this.messages.length > 0) {
                const message = this.messages[0];
                result = await method(message.data);
                this.consumedIds.add(message.id);
                this.messages.shift();
                console.log(`Message ${message.id} has been consumed.`);
            }
            this.clearConsumedIds();
        });
        return result;
    }
    public async consumeQueue(method: Function) {
        while (true) {
            const message = await this.dequeue(method);
            await sendTxConsumeHandle(message);
            await sleep(1000);
        }
    }

    private clearConsumedIds() {
        for (const id of this.consumedIds) {
            if (!this.messages.some((message) => message.id === id)) {
                this.consumedIds.delete(id);
            }
        }
    }
}