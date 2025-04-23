
export default function Message({ message }) {
    const { role, content } = message;
    const isUser = role === 'user';
  
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
          className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg shadow ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
          }`}
        >
          {/* Basic whitespace handling */}
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    );
  }