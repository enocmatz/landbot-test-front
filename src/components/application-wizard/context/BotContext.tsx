import { createContext, useContext } from "react";
import { BotContextType } from "./types";

const BotContext = createContext<BotContextType>({
    isLoading: false,
    messages: [],
    setOutput: () => {}
});

export function useBot() {
    const context = useContext(BotContext);
    if(context === null) {
        throw new Error('useBot must be used within a BotProvider');
    }
    return context;
}

export { BotContext }; 