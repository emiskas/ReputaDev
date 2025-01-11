import React, { useState } from 'react';
import axios from 'axios';

function Login({ toggleForm, onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.token); // Išsaugoti tokeną
            onSuccess(); // Call onSuccess to indicate successful login
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'An error occurred';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/backgroundas.jpg)' }}></div>
            <div className="flex items-center justify-center w-1/2 bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-gray-900">Prisijungimas</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="email"
                                placeholder="El. paštas"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Slaptažodis"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Prisijungti
                        </button>
                    </form>
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                    <p className="text-center mt-4">
                        Neturite paskyros?{' '}
                        <button onClick={toggleForm} className="text-blue-500 hover:underline">
                            Registruokitės
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
