'use client';

// src/app/error.js
import { useEffect } from 'react';
import { Button } from '@/components/ui';

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 p-3 rounded-full">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-4">
                    Something went wrong!
                </h2>

                <p className="text-gray-600 mb-6 text-center">
                    We apologize for the inconvenience. Please try again or contact support if the problem persists.
                </p>

                <div className="flex justify-center space-x-4">
                    <Button
                        onClick={() => window.location.href = '/'}
                        variant="outline"
                    >
                        Go Home
                    </Button>
                    <Button onClick={() => reset()}>
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    );
}