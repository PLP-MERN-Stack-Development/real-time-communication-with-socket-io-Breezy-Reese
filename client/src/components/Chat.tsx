import React, { useState, useEffect } from 'react';
import { useSocket } from '../socket/socket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

interface ChatProps {
  username: string;
  onLogout: () => void;
}

const Chat: React.FC<ChatProps> = ({ username, onLogout }) => {
  const {
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    setTyping,
  } = useSocket();

  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    connect(username);
    return () => {
      disconnect();
    };
  }, [connect, disconnect, username]);

  useEffect(() => {
    // Find current user ID
    const currentUser = users.find(user => user.username === username);
    if (currentUser) {
      setCurrentUserId(currentUser.id);
    }
  }, [users, username]);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const handleTyping = (isTyping: boolean) => {
    setTyping(isTyping);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Real-Time Chat
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome, {username}!
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 flex flex-col">
          <MessageList messages={messages} currentUser={currentUserId} />
          <MessageInput
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
          />
        </div>

        {/* Users Sidebar */}
        <UserList users={users} currentUser={currentUserId} typingUsers={typingUsers} />
      </div>
    </div>
  );
};

export default Chat;
