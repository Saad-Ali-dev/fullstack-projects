import { Link } from "react-router-dom";

export default function AskAIButton() {
  return (
    <Link
      to="/chatbot"
      className="fixed bottom-6 right-6 z-30 bg-[#ffa621] hover:bg-[#f3c547] text-gray-900 font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#fce444] focus:ring-offset-2"
      aria-label="Ask AI Assistant"
    >
      <span className="hidden sm:inline">Ask AI</span>
      <span className="sm:hidden text-lg">AI</span>
    </Link>
  );
}