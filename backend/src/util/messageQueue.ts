import { Mutex } from "async-mutex";
import { accessLogger } from './logger';
import dayjs from 'dayjs';
import { doSms } from "../sms/smsSchinese";
import { telegramBot } from "../sms/telegram";
import {extractMessageInAxiosError} from '../util/tools'

type Message = {
    id: string;
    data: any;
};
// let lastDoSMS = 0;
export class MessageQueue {
    private lastDoSMS: number = 0;
    private messages: Message[] = [];
    private consumedIds: Set<string> = new Set();
    public lastConsumeTime: number = Date.now();
    private mutex = new Mutex();
    constructor(private readonly name: string, private method: Function) {
    }
    public async enqueue(id: string, data: any) {
        await this.mutex.runExclusive(async () => {
            if (this.consumedIds.has(id)) {
                console.log(`${this.name} Message ${id} has already been consumed.`);
                return;
            }
            this.messages.push({ id, data });
            console.log(`${this.name} Message ${id} has been enqueued.${this.messages.length}`);
        });
    }
    public size() {
        return this.messages.length;
    }
    public async dequeue() {
        return new Promise(async (resolve, reject) => {
            // let result: any = null;
            await this.mutex.runExclusive(async () => {
                try {
                    this.lastConsumeTime = Date.now();
                    while (this.messages.length > 0 && this.consumedIds.has(this.messages[0].id)) {
                        console.warn(`${this.name} Message has been consumed ${this.messages[0].id}`)
                        this.messages.shift();
                    }
                    if (this.messages.length > 0) {
                        const message = this.messages[0];
                        const result = await this.method(message.data);
                        this.consumedIds.add(message.id);
                        this.messages.shift();
                        console.log(`Message ${message.id} has been consumed.`);
                        resolve(result)
                    }
                    this.clearConsumedIds();
                } catch (error) {
                    console.error(`Consumption error`, error);
                    reject(error);
                }
            });
            // return result;
        })
    }
    public async consumeQueue(callback: Function) {
        let isProcessing = false;
        const process = async () => {
            if (isProcessing) {
                return;
            }
            try {
                isProcessing = true;
                if (this.size() > 0) {
                    this.lastConsumeTime = Date.now();
                    const response = await this.dequeue();
                    accessLogger.info(`queue:${this.name}, Consumption results::${JSON.stringify(response || {})}`);
                    isProcessing = false;
                    if (response) {
                        await callback(null, response)
                    }
                }
            } catch (error) {
                callback(error);
                accessLogger.error(`queue:${this.name}, Consumption error`, error);
            } finally {
                isProcessing = false;
                this.lastConsumeTime = Date.now();
            }
        }
        setInterval(async () => {
            process();
            if (this.size() < 50 && Date.now() % 1200 === 0) {
                accessLogger.info(`Check Queue:${this.name}, Size:${this.size()}, lastConsumeTime:${dayjs(this.lastConsumeTime).format('YYYY-MM-DD HH:mm:ss')},isProcessing:${isProcessing}`);
            } else if (this.size() > 50 && Date.now() % 600 === 0) {
                accessLogger.info(`Check Queue:${this.name}, Size:${this.size()}, lastConsumeTime:${dayjs(this.lastConsumeTime).format('YYYY-MM-DD HH:mm:ss')},isProcessing:${isProcessing}`);
            }
            if (this.name == `chain:14` && this.size() >= 200 && Date.now() % 300 === 0) {
                telegramBot.sendMessage(`Check Queue:${this.name}, Size:${this.size()}, lastConsumeTime:${dayjs(this.lastConsumeTime).format('YYYY-MM-DD HH:mm:ss')},isProcessing:${isProcessing}`).catch(error => {
                    accessLogger.error(`consumeQueue0 send telegram message error message:${extractMessageInAxiosError(error)} stack ${error.stack}`);
                })
            }
            const timeout = Date.now() - this.lastConsumeTime;
            if (timeout > 1000 * 60 * 5 && this.size() > 0) {
                if (Date.now() - this.lastDoSMS >= 1000 * 60 * 3) {
                    const alert = `Warning:To ${this.name} last consumption ${(timeout / 1000).toFixed(0)} seconds, count:${this.size()}`;
                    doSms(alert)
                    telegramBot.sendMessage(alert).catch(error => {
                        accessLogger.error(`consumeQueue1 send telegram message error message:${extractMessageInAxiosError(error)} stack ${error.stack}`);
                    })
                    this.lastDoSMS = Date.now();
                }
            }
        }, 100);
    }

    private clearConsumedIds() {
        for (const id of this.consumedIds) {
            if (!this.messages.some((message) => message.id === id)) {
                this.consumedIds.delete(id);
            }
        }
    }
}