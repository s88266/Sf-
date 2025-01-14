import React, { useState, useEffect } from 'react';
import './PageChatBot.css';
import { chatBot } from '../backend/api';
import { FiSend } from 'react-icons/fi';

export function PageChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hallo! Ich bin dein Chatbot. Wie kann ich Ihnen helfen? Bitte achte auf deine Rechtschreibung ,da ich sonst nicht in der Lage bin deine Frage zu beantworten.' }
  ]);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await chatBot(input);
      typeMessage(response);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      const errorMessage = 'Es gab einen Fehler bei der Verarbeitung Ihrer Nachricht.';
      typeMessage(errorMessage);
    }

    setInput("");
  };

  const typeMessage = (message: any) => { 
    setTypingMessage("");
    setIsTyping(true);
    let index = 0;
    let tempMessage = "";

    const interval = setInterval(() => {
      tempMessage += message[index];
      setTypingMessage(tempMessage);
      index++;
      
      if (index >= message.length) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: message }]);
        setTypingMessage("");
      }
    }, 25);
  };
  return (
    <div className="container">
      <div className="chatWindow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'userMessage' : 'botMessage'}`}
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        ))}
        {isTyping && (
          <div className="message botMessage">
            {typingMessage}
          </div>
        )}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Schreiben Sie eine Nachricht..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="chat-form-button">
          <FiSend className="rotated-icon" />
        </button>
      </form>
    </div>
  );
}
