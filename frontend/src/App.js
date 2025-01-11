import React, { useState } from 'react';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleSuccess = () => {
    setIsLoggedIn(true);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  if (isLoggedIn) {
    return <Profile />;
  }

  return (
    <div className="App">
      {showLogin ? (
        <Login toggleForm={toggleForm} onSuccess={handleSuccess} />
      ) : (
        <Register toggleForm={toggleForm} onSuccess={handleSuccess} />
      )}
    </div>
  );
}

export default App;
