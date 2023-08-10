import { accessLogger } from "../util/logger";
import axios from 'axios'

export interface TelegramOption {
    chatId: string;
    disableNotification?: boolean;
    parseMode?: string;
    host?: string;
    token: string;
}

export class Telegram {
    constructor(private readonly opts?: TelegramOption) {}

    async sendMessage(type: string, messageText: string) {
        if (!process.env["TELEGRAM_TOKEN"] || !process.env["CHAT_ID"]) {
            accessLogger.error("Telegram Token null");
        }
        const requestData = {
            chat_id: this.opts?.chatId,
            text: `[Dashboard] ${messageText}`,
            disable_notification: this.opts?.disableNotification || false,
            parse_mode: this.opts?.parseMode || "",
        };
        try {
            const url = `${this.opts?.host || "https://api.telegram.org"}/bot${this.opts?.token}/sendMessage`;
            return await axios.post(url, requestData, { timeout: 30000 });
        } catch (error) {
            console.error("Error sending to Telegram", error);
            throw error;
        }
    }
}

export const telegramBot = new Telegram({
    token: String(process.env["TELEGRAM_TOKEN"]),
    chatId: String(process.env["CHAT_ID"]),
});
