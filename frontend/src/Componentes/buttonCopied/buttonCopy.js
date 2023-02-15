import { useState } from "react";


export const ButtonCopied = (props) => {
    const [copied, setCopied] = useState(true);


    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(!copied);
        });
    };

    return (
        <button onClick={() => copyToClipboard(props.id)} className='save'>{copied ? '💾' : '✅'}</button>
    )
};