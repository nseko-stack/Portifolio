import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const apiBaseUrl = import.meta.env.PROD
        ? import.meta.env.VITE_API_URL || 'https://portifolio-1-wbgs.onrender.com'
        : import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiBaseUrl}/contact`, { name, email, message });
            setName('');
            setEmail('');
            setMessage('');
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again later.');
        }
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8" id="Contact">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
                <h2 className="text-3xl font-bold text-slate-950">Contact Me</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">If you would like to get in touch, please fill out the form below:</p>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                            Name:
                        </label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2 px-3" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                            Email:
                        </label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2 px-3" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                            Message:
                        </label>
                        <textarea id="message" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                    </div>
                    <button type="submit" className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;