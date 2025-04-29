'use client'; 

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Message from '@/components/Message';
import InputArea from '@/components/InputArea';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const messagesEndRef = useRef(null); 

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleSendMessage = async (inputText) => {
    const newUserMessage = { role: 'user', content: inputText };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // --- LLM Integration Point (See Step 4) ---
    // 2. Prepare message history for API
    const messageHistory = [...messages, newUserMessage].map(msg => ({
      role: msg.role,
      content: msg.content,
    })); // Send current messages + new user message

    console.log("Sending to API:", messageHistory); // For debugging

    // 3. Simulate API Call & Streaming (Replace with actual fetch)
    try {
        // --- Actual API call would go here (see Step 4) ---
        const response = await fetch('/api/chat', {
          method: 'POST', // Use the POST method to send data
          headers: {
            'Content-Type': 'application/json', // Tell the server we're sending JSON
          },
          body: JSON.stringify({ messages: messageHistory }) // Convert your array into a JSON string and send it inside an object with the key 'messages'
        })

        if (!response.ok || !response.body) {
          throw new Error('Failed to get stream');
      }

      const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedResponse = ""; // To build the full response text

        // Add an initial empty assistant message to your state here
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        while (true) {
            const { done, value } = await reader.read(); // Read a chunk
            if (done) break; // Stream finished

            const textChunk = decoder.decode(value, { stream: true }); // Decode chunk to text
            accumulatedResponse += textChunk;

            // Update the *last* message (the assistant's response) in your state
            setMessages(prev => {
               const updated = [...prev];
               updated[updated.length - 1].content = accumulatedResponse;
               return updated;
            });
        }
        // --- End Streaming Logic ---

    } catch (error) {
        console.error("Error fetching response:", error);
        // Add an error message to the chat
        setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, something went wrong.' }]);
    }

  };

  // Handle starting a new chat
  const handleNewChat = () => {
    setMessages([]); // Clear messages array
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
      <InputArea onSend={handleSendMessage}  />
    </div>
  );
}