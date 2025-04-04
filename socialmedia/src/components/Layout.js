// src/components/Layout.js

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
    const router = useRouter();

    // Function to check if a link is active
    const isActive = (path) => {
        return router.pathname === path ? 'bg-indigo-800' : '';
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-xl font-bold">Social Media Analytics</h1>
                            </div>
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/"
                                    className={`${isActive('/')} px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700`}>
                                    Top Users
                                </Link>
                                <Link href="/trending"
                                    className={`${isActive('/trending')} px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700`}>
                                    Trending Posts
                                </Link>
                                <Link href="/feed"
                                    className={`${isActive('/feed')} px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700`}>
                                    Feed
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        Social Media Analytics Dashboard © {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
}