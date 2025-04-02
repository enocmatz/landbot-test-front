import { Message } from "../types";

export function parseMessage(data: any): Message | null {
    const message = {
        action: data?.action,
        key: data.key,
        text: data.title || data.message,
        author: data.samurai !== undefined ? 'bot' : 'user',
        timestamp: data.timestamp,
        type: data.type,
        payloads: data?.payloads,
        buttons: data?.buttons,
        extra: data?.extra,
        partOf: data?.extra?.id,
        seq: data?.seq,
        rich_text: data?.rich_text,
    };
    if(message.key === 'undefined' || message.key === null){
        return null;
    }
    return message;
}

export const CONFIG_URL = "https://landbot.online/v3/H-2850612-5JW5A3BKH05OJ4MJ/index.json"; 