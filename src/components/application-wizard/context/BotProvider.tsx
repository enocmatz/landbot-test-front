import { useEffect, useRef, useState } from "react";
import { Message, Reply } from "../types";
import LandbotCore from "@landbot/core";
import { BotContext } from "./BotContext";
import { BotContextType, BotProviderProps } from "./types";
import { parseMessage, CONFIG_URL } from "./utils";

export function BotProvider({ children }: BotProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [config, setConfig] = useState<any>(null);
    const [output, setOutput] = useState<Reply | null>(null);
    const coreBot = useRef<LandbotCore | null>(null);

    const dataPipeline = (data: Message) => {
        if(data.author !== 'user') {
            setMessages(prev => [...prev, data])
            setIsLoading(false);
        }
    }

    useEffect(() => {   
        fetch(CONFIG_URL)
            .then(res => res.json())
            .then(config => {
                setConfig(config);
            });
    }, []);

    useEffect(() => {
        if (config && coreBot.current === null) {
            console.log('Config received, creating new instance');
            coreBot.current = new LandbotCore(config);
            coreBot.current.pipelines.$readableSequence.subscribe(data => {
                const message = parseMessage(data)
                if (message) {
                    dataPipeline(message)
                }
            });
            coreBot.current.init().then(data => {
                const message = parseMessage(data)
                if (message) {
                    dataPipeline(message)
                }   
            });
        }
    }, [config]);

    useEffect(() => {
        if(output !== null && coreBot.current !== null){
            const out: Reply = {
                message: output.message,
                custom_data: {}
            }
            if(output.payload !== undefined){
                out.payload = output.payload;
            }
            if(output.type !== undefined){
                out.type = output.type;
            }
            if(output.ui_key !== undefined){
                out.ui_key = output.ui_key;
            }
            if(output.url !== undefined){
                out.url = output.url;
            }
            coreBot.current?.sendMessage(out);
            setOutput(null);
            setIsLoading(true);
        }
    }, [output]);

    const value: BotContextType = {
        isLoading,
        messages,
        setOutput
    }

    return <BotContext.Provider value={value}>{children}</BotContext.Provider>
}