import React from 'react';

interface User {
  id: string;
  username: string;
}

interface UserListProps {
  users: User[];
  currentUser: string;
  typingUsers: string[];
}

const UserList: React.FC<UserListProps> = ({ users, currentUser, typingUsers }) => {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Online Users ({users.length})
      </h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              user.id === currentUser
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {user.username}
              {user.id === currentUser && ' (You)'}
            </span>
            {typingUsers.includes(user.username) && (
              <span className="text-xs text-gray-500 italic">typing...</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
