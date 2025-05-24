import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import WorkInProgress from './WorkInProgress.js';

export default function ChatBot ( props ) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState('');
    const [responses, setResponses] = useState([]);
    const chatRef = useRef(null);
    const chatWindowRef = useRef(null);
    const [history, setHistory] = useState([]);

    const toggleChat = () => {
        setIsOpen(prev => !prev);
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [history]);

    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                chatWindowRef.current &&
                !chatWindowRef.current.contains(e.target) &&
                !e.target.closest('.chatbot-toggle')
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSendMessage = async () => {
    if (!message.trim()) return;
        // Store user message
        setHistory(prev => [...prev, { messenger: 'user', text: message }]);
        setMessages(prev => [...prev, message]); // Optional, for separate tracking

        try {
            const res = await fetch('http://127.0.0.1:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            const botResponse = data.response || 'No response';

            // Store bot response
            setHistory(prev => [...prev, { messenger: 'bot', text: botResponse }]);
            setResponses(prev => [...prev, botResponse]); // Optional, for separate tracking
        } catch (error) {
            console.error('Error talking to chatbot:', error);
            const errorMsg = 'Error connecting to chatbot';
            setHistory(prev => [...prev, { messenger: 'bot', text: errorMsg }]);
        }

        setMessage(''); // Clear input
    };

    return (
        <div className={`chatbot ${isOpen ? 'open' : ''}`}>
            <button className="chatbot-toggle" onClick={toggleChat}>
                <img
                    src={`${process.env.PUBLIC_URL}/img/icon/chat-bot.png`}
                    alt="Chat"
                    className="chatbot-icon"
                />
                {/* Chat */}
            </button>
            {isOpen && (
                <div className="chatbot-window" ref={chatWindowRef} >
                    {/* <WorkInProgress /> */}
                    <div className="chatbot-messages" ref={chatRef}>
                        {history.map((msg, index) => (
                            <div key={index} className={`message ${msg.messenger}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input-area">
                        <input
                            type="text"
                            value={message}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );

//   return (
//     <>
//     {/* props.isMobile ? (

//     ) : (

//     ) */}

}
