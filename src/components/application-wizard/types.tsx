/**
 * Message type from the Landbot API
 * - it can be specialized to match different types of messages, instead of using the extra fields
 */
export interface Message {
    action?: string;
    key: string;
    text: string;
    author: string;
    timestamp: string;
    type: string;
    payloads?: string[];
    buttons?: string[];
    extra?: any;
    seq?: number;
    partOf?: string;
    rich_text?: string;
}

/**
 * Reply type to the Landbot API
 * - it can be specialized to match different types of reply, instead of using the extra fields
 */
export interface Reply {
    message: string;
    payload?: string;
    type?: string;
    ui_key?: string;
    custom_data?: Record<string, any>;
    url?: string; //Requird for file upload
}