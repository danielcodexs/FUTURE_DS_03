
import { useState } from 'react';
import Desktop from '@/components/Desktop';
import LoginScreen from '@/components/LoginScreen';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user: string, password: string) => {
    // Simple validation for demo purposes
    if (user && password) {
      setUsername(user);
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isLoggedIn ? (
        <Desktop username={username} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Index;
