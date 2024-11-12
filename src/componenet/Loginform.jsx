// LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      onLogin(response.data); // Pass data to parent on successful login
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-center text-2xl text-teal-200 font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-teal-500 rounded text-white font-bold hover:bg-teal-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
