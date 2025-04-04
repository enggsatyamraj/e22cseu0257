'use client';

// src/components/Unauthorized.js
import React, { useState } from 'react';
import { Button } from './ui';
import { registerCompany } from '@/services/authService';
import Link from 'next/link';

export default function Unauthorized({ onRegister }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(null);
    const [serverMessage, setServerMessage] = useState(null);
    const [serverResponse, setServerResponse] = useState(null);

    const handleRegister = async () => {
        try {
            setIsRegistering(true);
            setError(null);
            setServerMessage(null);
            setServerResponse(null);

            // Use the default registration
            const result = await registerCompany();

            if (result.success) {
                if (onRegister) {
                    onRegister();
                }
            } else {
                setServerMessage(result.error);
                if (result.serverResponse) {
                    setServerResponse(result.serverResponse);
                }
            }
        } catch (err) {
            setError('Failed to register with the server. Please try again.');
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Social Media Analytics
                </h2>

                <p className="text-gray-600 mb-6 text-center">
                    Welcome to the Social Media Analytics dashboard. You need to register to access the analytics data.
                </p>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                {serverMessage && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Server message: {serverMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {serverResponse && (
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Server Response:</h3>
                        <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                            {JSON.stringify(serverResponse, null, 2)}
                        </pre>
                    </div>
                )}

                <div className="flex flex-col space-y-4">
                    <Button
                        onClick={handleRegister}
                        disabled={isRegistering}
                        className="w-full"
                    >
                        {isRegistering ? 'Registering...' : 'Quick Register & Continue'}
                    </Button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <Link
                        href="/register"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
                    >
                        Custom Registration
                    </Link>

                    <div className="text-sm text-center mt-4">
                        <p className="text-gray-600">
                            Already registered?{' '}
                            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Login with existing credentials
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}