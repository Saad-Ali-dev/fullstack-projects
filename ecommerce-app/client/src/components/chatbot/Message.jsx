import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export default function Message({ message }) {
  const { role, content } = message;
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[85%] sm:max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 lg:px-4 rounded-lg shadow ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <div className="text-sm sm:text-base whitespace-pre-wrap">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}