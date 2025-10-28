import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (user: string) => {
    setUsername(user);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <div className="App">
      {username ? (
        <Chat username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
