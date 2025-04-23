
'use client'; 

export default function Header({ onNewChat }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Chatbot
        </h1>
        <button
          onClick={onNewChat}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out text-sm"
          aria-label="Start a new chat"
        >
          New Chat
        </button>
      </div>
    </header>
  );
}