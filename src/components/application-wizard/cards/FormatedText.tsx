import DOMPurify from 'dompurify';

export function FormatedText({text}: {text: string}) {
    //Ok, the string contains potential hazardous HTML, so we need to sanitize it   
    const sanitizedHtml = DOMPurify.sanitize(text);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
