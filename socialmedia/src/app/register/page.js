'use client';

// src/app/register/page.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerCompany } from '@/services/authService';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [serverResponse, setServerResponse] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        mobileNo: '',
        githubUsername: '',
        rollNo: '',
        collegeName: '',
        accessCode: 'rtCHZJ' // Default value that can be changed
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
        setServerResponse(null);

        // Validate form fields
        if (!formData.email || !formData.name || !formData.mobileNo ||
            !formData.githubUsername || !formData.rollNo || !formData.collegeName) {
            setErrorMessage('All fields are required');
            setIsLoading(false);
            return;
        }

        // Call registration API
        const result = await registerCompany(formData);

        if (result.success) {
            setSuccessMessage('Registration successful! Redirecting to dashboard...');
            setServerResponse(result.data);

            // Add a delay before redirecting
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            setErrorMessage(result.error);
            if (result.serverResponse) {
                setServerResponse(result.serverResponse);
            }
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register Your Company
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Complete this form to access the Social Media Analytics Dashboard
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

                {serverResponse && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                        <h3 className="text-sm font-medium text-yellow-800 mb-2">Server Response:</h3>
                        <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40">
                            {JSON.stringify(serverResponse, null, 2)}
                        </pre>
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
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="mobileNo" className="sr-only">Mobile Number</label>
                            <input
                                id="mobileNo"
                                name="mobileNo"
                                type="text"
                                autoComplete="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Mobile Number"
                                value={formData.mobileNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="githubUsername" className="sr-only">GitHub Username</label>
                            <input
                                id="githubUsername"
                                name="githubUsername"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="GitHub Username"
                                value={formData.githubUsername}
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
                            <label htmlFor="collegeName" className="sr-only">College Name</label>
                            <input
                                id="collegeName"
                                name="collegeName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="College Name"
                                value={formData.collegeName}
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Access Code"
                                value={formData.accessCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 ${!isLoading ? 'hover:bg-indigo-700' : 'opacity-70'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}