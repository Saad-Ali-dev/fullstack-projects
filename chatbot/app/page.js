"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Message from "@/components/Message";
import InputArea from "@/components/InputArea";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (inputText) => {
    const newUserMessage = { role: "user", content: inputText };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Prepare message history for API
    const messageHistory = [...messages, newUserMessage].map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    console.log("Sending to API:", messageHistory);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messageHistory }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      // Add an initial empty assistant message to state here
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read(); // Read a chunk
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true }); // Decode chunk to text
        accumulatedResponse += textChunk;

        // Update the *last* message (the assistant's response) in  state
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = accumulatedResponse;
          return updated;
        });
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, something went wrong." },
      ]);
    }
  };

  // Handle starting a new chat
  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header onNewChat={handleNewChat} />

      {/* Chat Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 container px-4 sm:px-6 md:px-8 lg:px-10 2xl:p-20 min-w-screen scrollbar">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      {/* Empty div to scroll to */}
      <div ref={messagesEndRef} />

      {/* Input Area */}
      <InputArea onSend={handleSendMessage} />
    </div>
  );
}
