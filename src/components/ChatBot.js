import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { generateResponse, getGreeting } from '../services/chatbotEngine';

export default function ChatBot(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef(null);
    const chatWindowRef = useRef(null);
    const inputRef = useRef(null);
    const hasGreeted = useRef(false);

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
    }, [history, isTyping]);

    useEffect(() => {
        if (isOpen && !hasGreeted.current) {
            hasGreeted.current = true;
            setIsTyping(true);
            setTimeout(() => {
                setHistory([{ messenger: 'bot', text: getGreeting() }]);
                setIsTyping(false);
            }, 600);
        }
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [isOpen]);

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

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const userMsg = message.trim();

        setHistory(prev => [...prev, { messenger: 'user', text: userMsg }]);
        setMessage('');

        setIsTyping(true);
        setTimeout(() => {
            const botResponse = generateResponse(userMsg);
            setHistory(prev => [...prev, { messenger: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 400 + Math.random() * 400);
    };

    return (
        <div className={`chatbot ${isOpen ? 'open' : ''}`}>
            <button className="chatbot-toggle" onClick={toggleChat} aria-label="Toggle chat">
                <img
                    src={`${process.env.PUBLIC_URL}/img/icon/chat-bot.png`}
                    alt="Chat"
                    className="chatbot-icon"
                />
            </button>
            {isOpen && (
                <div className="chatbot-window" ref={chatWindowRef}>
                    <div className="chatbot-header">
                        <span className="chatbot-header-title">💬 Portfolio Assistant</span>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">✕</button>
                    </div>
                    <div className="chatbot-messages" ref={chatRef}>
                        {history.map((msg, index) => (
                            <div key={index} className={`message ${msg.messenger}`}>
                                {msg.messenger === 'bot' && <span className="message-avatar">🤖</span>}
                                {msg.messenger === 'bot' ? (
                                    <span
                                        className="message-text"
                                        dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }}
                                    />
                                ) : (
                                    <span className="message-text">{msg.text}</span>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot">
                                <span className="message-avatar">🤖</span>
                                <span className="message-text typing-indicator">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="chatbot-input-area">
                        <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage} disabled={!message.trim()}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}
