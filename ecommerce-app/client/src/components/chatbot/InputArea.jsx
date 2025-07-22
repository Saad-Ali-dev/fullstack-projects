import { useState, useRef } from "react";

export default function InputArea({ onSend, isLoading = false }) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue.trim());
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="bg-white p-4 border-t border-gray-200">
      <div className="container mx-auto flex items-end space-x-3">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 text-sm max-h-40 overflow-y-auto"
          rows="1"
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          className={`px-5 py-3 ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
          aria-label="Send message"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}