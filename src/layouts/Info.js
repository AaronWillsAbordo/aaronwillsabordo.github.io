import React, { useState, forwardRef } from 'react';
import { dataInfo } from '../data/data.js'; 
import './Info.css';

const Info = forwardRef((props, ref) => {

    const [alertVisible, setAlertVisible] = useState(false);
    const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopiedText(text);
                setAlertVisible(true);

                // Hide the alert after 3 seconds
                setTimeout(() => {
                    setAlertVisible(false);
                }, 3000);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };
    
    return (
        <section ref={ref} className='layoutWhite'>
            <title>Get in touch</title>
            <h2>What’s next? Feel free to reach out to me if you’re looking for a developer, have a query, or simply want to connect.</h2>

            <h6 onClick={() => copyToClipboard(dataInfo[0].email)} style={{ cursor: 'pointer' }}>
                {dataInfo[0].email}
            </h6>

            <h6 onClick={() => copyToClipboard(dataInfo[0].number)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                {dataInfo[0].number}
            </h6>

            {alertVisible && (
                <div className="custom-alert">
                    Copied "{copiedText}" to clipboard!
                </div>
            )}

        </section>
    );
});

export default Info;