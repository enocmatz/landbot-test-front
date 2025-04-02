import { useEffect, useRef } from "react";
import { ProxyStyleCard } from "./cards/ProxyStyleCard";
import { Message } from "./types";

import "./bot.css";
import { useBot } from "./context/BotContext";

export function Wizard() {
    const container = useRef<HTMLDivElement>(null);

    const {isLoading, messages} = useBot();

    useEffect(() => {
        if(container.current){
            container.current.scrollTop = container.current.scrollHeight;
        }
    }, [messages, isLoading]);  

    return (
        <div ref={container} className="bubble-container">
            <h3>Application Assistant</h3>
            {messages.map((message: Message) => (
                <ProxyStyleCard key={message.key} data={message} />
            ))}
            {isLoading && <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>}
        </div>
    )
}