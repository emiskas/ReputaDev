import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist login status
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login status
    localStorage.removeItem('username'); // Clear username
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to profile if logged in */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to={`/profile/${localStorage.getItem('username')}`} /> : <Navigate to="/login" />}
          />
          {/* Login page */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to={`/profile/${localStorage.getItem('username')}`} />
              ) : (
                <Login toggleForm={() => <Navigate to="/register" />} onSuccess={handleSuccess} />
              )
            }
          />
          {/* Register page */}
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to={`/profile/${localStorage.getItem('username')}`} />
              ) : (
                <Register toggleForm={() => <Navigate to="/login" />} onSuccess={handleSuccess} />
              )
            }
          />
          {/* Profile page */}
          <Route path="/profile/:username" element={<Profile onLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
