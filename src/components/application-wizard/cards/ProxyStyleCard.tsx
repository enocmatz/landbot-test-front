import { Message } from "../types"
import { FileUploadCard } from "./FileuploadCard"
import { EmailCard } from "./EmailCard"
import { ButtonChoiceCard } from "./ButtonChoiceCard"
import { TextCard } from "./TextCard"
import { PlainCard } from "./PlainCard"
import { useBot } from "../context/BotContext"

export function ProxyStyleCard({data}: {data: Message}){
    const { setOutput } = useBot();

    if(data.type === 'text'){
      if(data.extra?.textarea?.type === 'file'){
          return <FileUploadCard data={data} setOutput={setOutput} />
      } else if(data.extra?.textarea?.type === 'text'){
          return <TextCard data={data} setOutput={setOutput} />
      } else if(data.extra?.textarea?.type === 'email'){
          return <EmailCard data={data} setOutput={setOutput} />
      } else{
          return <PlainCard data={data} /> 
      }
    } else if(data.type === 'dialog'){
      return <ButtonChoiceCard data={data} setOutput={setOutput} />
    }

    // Default fallback
    return <PlainCard data={data} />
}
