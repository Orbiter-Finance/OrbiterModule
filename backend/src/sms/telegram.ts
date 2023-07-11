export interface TelegramOption {
    chatId: string;
    disableNotification?: boolean,
    parseMode?: string,
    host?: string,
    token: string;
}
import axios from 'axios'
import { accessLogger } from '../util/logger';
export default class Telegram {
    constructor(
        private readonly opts?: TelegramOption,
    ) {
    }
    async sendMessage(messageText: string) {
        if (!process.env["TELEGRAM_TOKEN"] || !process.env["CHAT_ID"]) {
            accessLogger.error('Telegram Token null');
        }
        const requestData = {
            chat_id: this.opts?.chatId,
            text: messageText,
            disable_notification: this.opts?.disableNotification || false,
            parse_mode: this.opts?.parseMode || "",
        };
        try {
            const url =  `${this.opts?.host || "https://api.telegram.org"}/bot${this.opts?.token
        }/sendMessage`;
            const result = await axios.post(url,requestData, { timeout: 30000 })
            return result;
        } catch (error) {
            console.error("Error sending to Telegram", error.message);
            throw error;
        }
    }
}

export const telegramBot = new Telegram({
    token: String(process.env["TELEGRAM_TOKEN"]),
    chatId: String(process.env["CHAT_ID"])
})