import React, { useEffect, useRef } from 'react';

interface Message {
  id: number;
  sender: string;
  senderId: string;
  message: string;
  timestamp: string;
  system?: boolean;
  isPrivate?: boolean;
}

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isScrolledToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return true;
    const threshold = 100; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  };

  useEffect(() => {
    if (isScrolledToBottom()) {
      scrollToBottom();
    }
  }, [messages]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.senderId === currentUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.system
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-center mx-auto'
                : msg.senderId === currentUser
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
            }`}
          >
            {!msg.system && (
              <div className="text-xs font-semibold mb-1">
                {msg.sender}
                {msg.isPrivate && <span className="text-yellow-300 ml-1">(Private)</span>}
              </div>
            )}
            <div className="text-sm">{msg.message}</div>
            <div className="text-xs opacity-70 mt-1">
              {formatTime(msg.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
