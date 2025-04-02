import { Message, Reply } from '../types'
import { useState, DragEvent, useRef } from 'react'
import { Bubble } from './Bubble'
import { FormatedText } from './FormatedText';

interface DragDropBoxProps {
    onFileDrop: (file: File) => void;
    disabled: boolean;
}

function DragDropBox({ onFileDrop, disabled }: DragDropBoxProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [currentFiles, setCurrentFiles] = useState<FileList | null>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (disabled) return;
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileDrop(files[0]);
            setCurrentFiles(files);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFileDrop(files[0]);
            setCurrentFiles(files);
        }
    };

    return (
        <div
            className={`drag-drop-box ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

            {currentFiles && currentFiles.length > 0 && (
                <div className="drag-drop-content">
                    {Array.from(currentFiles).map((file, index) => (
                        <p key={index}>{file.name}</p>
                    ))}
                    <hr />

                </div>
            )}
            <div className="drag-drop-content">
                <p>Drag and drop a file here</p>
                <p className="subtext">or</p>
                <p>Click to select a file</p>
            </div>
        </div>
    );
}

export function FileUploadCard({data, setOutput}: {data: Message, setOutput: (output: Reply | null) => void}){
    const [url, setUrl] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);


    const handleFileUpload = (url: string, fileName: string) => {
        setOutput({
            message: fileName,
            url: url,
            type: 'file',
        })
        setDisabled(true);
    }

    const handleFileDrop = (file: File) => {
        const fileUrl = URL.createObjectURL(file).replace('blob:', '').replace('file://', 'https://').replace('blob://', 'https://');
        setUrl(fileUrl);
        setFileName(file.name);
    }



    return <Bubble>
        <FormatedText text={data.rich_text || data.text} />

        <DragDropBox onFileDrop={handleFileDrop} disabled={disabled} />
        <pre>I don't have the proper data to configure the file upload endpoint, so the file won't be uploaded. I could inspect the network traffic using the LandBot ChatBot to figure out how it works, but it's not required for the purpose of this example. Or look for other any other file storage endpoiint (but i dont know anyone free at the moment)</pre>

        <button onClick={() => {
            handleFileUpload(url, fileName)
        }} disabled={url.length === 0 || fileName.length === 0 || disabled} className={disabled ? 'selected' : ''}>Upload!</button>
    </Bubble>
}