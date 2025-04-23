// app/page.js
'use client'; // This component manages state, so it must be a Client Component

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Message from '@/components/Message';
import InputArea from '@/components/InputArea';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    // Example initial message (optional)
    // { role: 'bot', content: 'Hello! How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const messagesEndRef = useRef(null); // Ref to scroll to bottom

  // Function to scroll to the bottom of the messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async (inputText) => {
    // 1. Add user message immediately to the UI
    const newUserMessage = { role: 'user', content: inputText };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true); // Show loading indicator

    // --- LLM Integration Point (See Step 4) ---
    // 2. Prepare message history for API
    const messageHistory = [...messages, newUserMessage].map(msg => ({
      role: msg.role,
      content: msg.content,
    })); // Send current messages + new user message

    console.log("Sending to API:", messageHistory); // For debugging

    // 3. Simulate API Call & Streaming (Replace with actual fetch)
    try {
        // --- Start Placeholder ---
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate a simple streamed response
        const simulatedResponse = "This is a simulated streamed response from the bot. It will appear word by word.".split(' ');
        let currentBotMessage = { role: 'bot', content: '' };

        // Add initial empty bot message
        setMessages(prev => [...prev, currentBotMessage]);

        for (let i = 0; i < simulatedResponse.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 80)); // Simulate word delay
            currentBotMessage.content += (i > 0 ? ' ' : '') + simulatedResponse[i];
            // Update the *last* message in the state
            setMessages(prev => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1] = { ...currentBotMessage };
                return updatedMessages;
            });
        }
        // --- End Placeholder ---

        // --- Actual API call would go here (see Step 4) ---
        // const response = await fetch('/api/chat', { ... });
        // await handleStreamingResponse(response); // You'll need a function for this

    } catch (error) {
        console.error("Error fetching response:", error);
        // Add an error message to the chat
        setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, something went wrong.' }]);
    } finally {
        setIsLoading(false); // Hide loading indicator
    }

  };

  // Handle starting a new chat
  const handleNewChat = () => {
    setMessages([]); // Clear messages array
    setIsLoading(false); // Reset loading state
    // Optionally add a default greeting message
    // setMessages([{ role: 'bot', content: 'Hello! How can I help you today?' }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header onNewChat={handleNewChat} />

      {/* Chat Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 container mx-auto">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        {/* Empty div to scroll to */}
        <div ref={messagesEndRef} />
        {/* Optional: Show loading indicator visually in chat area */}
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
           <div className="flex justify-start mb-4">
              <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg shadow bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                <p className="text-sm italic">Bot is thinking...</p>
              </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <InputArea onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}