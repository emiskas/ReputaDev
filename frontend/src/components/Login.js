import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ toggleForm, onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const csrfToken = window.csrfToken; // Get CSRF token from the global variable

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/login/',
        { username, password },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      setMessage(response.data.message);

      // Save logged-in status and username
      if (response.data.username) {
        localStorage.setItem('username', response.data.username); // Store the username
        localStorage.setItem('isLoggedIn', 'true'); // Save the logged-in status
      }

      onSuccess(); // Call onSuccess to indicate successful login
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url(/backgroundas.jpg)' }}
      ></div>
      <div className="flex items-center justify-center w-1/2 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900">Login page</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          <p className="text-center mt-4">
            New here?{' '}
            <button onClick={() => navigate('/register')} className="text-blue-500 hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
