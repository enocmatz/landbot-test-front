import { Message, Reply } from "../types";

export interface BotContextType {
    isLoading: boolean;
    messages: Message[];
    setOutput: (output: Reply | null) => void;
}

export interface BotProviderProps {
    children: React.ReactNode;
} 