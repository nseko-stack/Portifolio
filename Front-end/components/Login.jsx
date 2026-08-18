import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';

function Form() {
  const [name, setName] = useState('');
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameValid = name.trim().length > 0;
  //const emailValid = emailRegex.test(email);
  const passwordValid = password.trim().length > 0;
  const formValid = nameValid && emailValid && passwordValid;

  const apiBaseUrl = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL || 'https://portifolio-1-wbgs.onrender.com'
    : import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValid) {
      setStatusMessage('Please fill in all fields correctly.');
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/login`, { name, email, password });
      setStatusMessage(response.data?.message || 'Login successful!');
      setIsSuccess(true);
      setName('');
      setPassword('');
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again later.';
      setStatusMessage(errorMessage);
      setIsSuccess(false);
    }
  };

  return (
    

    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-md">
      <Link to="/" className="text-sm font-medium text-sky-600 hover:underline">
        &larr; Back to Home
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Login</h1>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your username"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-sky-500"
        />
        {name && !nameValid && <p className="mt-2 text-sm text-red-500">Username can't be empty!</p>}
      </div>

       

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-sky-500"
        />
        {password && !passwordValid && <p className="mt-2 text-sm text-red-500">Password can't be empty!</p>}
      </div>

      <button
        type="submit"
        disabled={!formValid}
        className="w-full rounded-full bg-sky-600 px-4 py-2.5 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Login
      </button>

      {statusMessage && (
        <p className={`mt-4 text-sm ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
          {statusMessage}
        </p>
      )}
     
    </form>
  );
}

export default Form;
