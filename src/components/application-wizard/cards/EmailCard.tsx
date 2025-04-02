import { Message, Reply } from "../types";
import { useState } from "react";
import { Bubble } from "./Bubble";
import { FormatedText } from "./FormatedText";

export function EmailCard({data, setOutput}: {data: Message, setOutput: (output: Reply | null) => void}){
    const [input, setInput] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleInput = (input: string) => {
        setOutput({
            message: input,
        })
        setInput(input);
        setDisabled(true);
    }

    const validateEmail = (email: string) => {
        return email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }   

    return (
        <Bubble>
            <FormatedText text={data.rich_text || data.text} />
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
                if(!disabled && e.key === 'Enter'){
                    handleInput(input);
                }
            }} disabled={disabled} />
            <button onClick={() => {
                handleInput(input);
            }} disabled={!validateEmail(input) || disabled} className='field-send-button'>Send</button>
        </Bubble>
    )
}