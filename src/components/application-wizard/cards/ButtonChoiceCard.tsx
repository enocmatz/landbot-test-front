import { Message, Reply } from "../types";
import { useState } from "react";
import { Bubble } from "./Bubble";
import { FormatedText } from "./FormatedText";
import { zip } from "../../utils";

export function ButtonChoiceCard({data, setOutput}: {data: Message, setOutput: (output: Reply | null) => void}){
    const [selected, setSelected] = useState<string>('');

    const handleSelection = (payload: string, button: string, key: string) => {
        setOutput({
            message: button,
            payload: payload,
            type: 'button',
            ui_key: key,
        })
    }

    const deriveClass = (selected: string, payload: string) => {
        if(selected === payload){
            return 'selected';
        } else {
            return '';
        }
    }
    

    const bt = data.buttons || [];
    const pt = data.payloads || [];
    const out = zip(bt, pt).filter(([button, _]) => button.length > 0);
    
    return (
        <Bubble>
            <FormatedText text={data.rich_text || data.text} />
            {out.map(([button, payload]) => (
                <button key={payload} onClick={() => {
                    setSelected(payload);
                    handleSelection(payload, button, data.key);
                }} className={deriveClass(selected, payload)} disabled={selected !== ''}>{button}</button>
            ))}
        </Bubble>
    )
}