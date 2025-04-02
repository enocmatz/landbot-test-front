import { Message } from "../types";
import { Bubble } from "./Bubble";
import { FormatedText } from "./FormatedText";

export function PlainCard({data}: {data: Message}){
    return (
        <Bubble>
            <FormatedText text={data.rich_text || data.text} />
        </Bubble>
    )
}