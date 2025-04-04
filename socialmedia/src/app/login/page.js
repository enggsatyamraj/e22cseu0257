'use client';

// src/app/login/page.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        rollNo: '',
        accessCode: '',
        clientID: '',
        clientSecret: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Validate form fields
            if (!formData.email || !formData.name || !formData.rollNo ||
                !formData.accessCode || !formData.clientID || !formData.clientSecret) {
                setErrorMessage('All fields are required');
                setIsLoading(false);
                return;
            }

            // Store credentials in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('clientCredentials', JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    rollNo: formData.rollNo,
                    accessCode: formData.accessCode,
                    clientID: formData.clientID,
                    clientSecret: formData.clientSecret
                }));
            }

            setSuccessMessage('Credentials saved! Redirecting to dashboard...');

            // Redirect to home page after a short delay
            setTimeout(() => {
                router.push('/');
            }, 1500);
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login with Existing Credentials
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your registration details to access the dashboard
                    </p>
                </div>

                {errorMessage && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">
                                    {successMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="rollNo" className="sr-only">Roll Number</label>
                            <input
                                id="rollNo"
                                name="rollNo"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Roll Number"
                                value={formData.rollNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="accessCode" className="sr-only">Access Code</label>
                            <input
                                id="accessCode"
                                name="accessCode"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Access Code"
                                value={formData.accessCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="clientID" className="sr-only">Client ID</label>
                            <input
                                id="clientID"
                                name="clientID"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Client ID"
                                value={formData.clientID}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="clientSecret" className="sr-only">Client Secret</label>
                            <input
                                id="clientSecret"
                                name="clientSecret"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Client Secret"
                                value={formData.clientSecret}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 ${!isLoading ? 'hover:bg-indigo-700' : 'opacity-70'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isLoading ? 'Processing...' : 'Continue to Dashboard'}
                        </button>

                        <div className="text-sm text-center">
                            <p className="text-gray-600">
                                Don't have credentials yet?{' '}
                                <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}