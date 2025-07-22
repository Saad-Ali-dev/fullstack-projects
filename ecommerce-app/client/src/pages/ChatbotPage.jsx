import { useState, useEffect, useRef } from "react";
import Message from "../components/chatbot/Message";
import InputArea from "../components/chatbot/InputArea";

export default function ChatbotPage() {
  // Initial message from the chatbot
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! How can I help you with your shopping at Amazon Clone?\n(e.g., you could ask me about specific product details available at the store)",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (inputText) => {
    const newUserMessage = { role: "user", content: inputText };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chatbot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: newMessages }),
        },
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to get stream from server.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      // Stream response from the server to the User
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });
        accumulatedResponse += textChunk;

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
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 pt-6 pb-2 text-center flex-shrink-0">
        Amazon AI Support
      </h1>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 container mx-auto px-4 sm:px-6">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0">
        <InputArea onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}