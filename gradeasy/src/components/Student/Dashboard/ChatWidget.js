// src/components/Student/Dashboard/ChatWidget.js
import React, { useState } from "react";
import "./ChatWidget.css";

const ChatWidget = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "assistant" },
  ]);
  const [input, setInput] = useState("");

  // Function to handle sending messages
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.reply, sender: "assistant" }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages([
        ...newMessages,
        { text: "Sorry, something went wrong.", sender: "assistant" },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat with Assistant
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "assistant-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;
