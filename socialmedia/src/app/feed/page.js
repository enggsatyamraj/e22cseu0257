'use client';

// src/app/feed/page.js
import { useState, useEffect } from 'react';
import { useSocial } from '@/context/SocialContext';
import {
    LoadingSpinner,
    ErrorMessage,
    Button
} from '@/components/ui';
import PostCard from '@/components/PostCard';
import Unauthorized from '@/components/Unauthorized';

export default function FeedPage() {
    const {
        isAuthenticated,
        isLoading,
        error,
        latestPosts,
        users,
        refreshData
    } = useSocial();

    const [isRefreshing, setIsRefreshing] = useState(false);

    // Handle refresh button click
    const handleRefresh = () => {
        setIsRefreshing(true);
        refreshData();
        setTimeout(() => setIsRefreshing(false), 1000); // UI feedback
    };

    // Find user by ID
    const findUser = (userId) => {
        return users.find(user => user.id === userId);
    };

    // If not authenticated, show the unauthorized component
    if (!isAuthenticated && !isLoading) {
        return <Unauthorized onRegister={refreshData} />;
    }

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Latest Posts Feed</h1>
                <Button
                    onClick={handleRefresh}
                    disabled={isRefreshing || isLoading}
                    variant={isRefreshing ? "secondary" : "primary"}
                    size="sm"
                >
                    {isRefreshing ? 'Refreshing...' : 'Refresh Feed'}
                </Button>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <div className="space-y-6">
                    {latestPosts.length > 0 ? (
                        latestPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                user={findUser(post.userid)}
                                commentCount={post.commentCount || 0}
                            />
                        ))
                    ) : (
                        <div className="py-10 text-center text-gray-500 bg-white rounded-lg shadow">
                            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                            </svg>
                            <p className="text-lg">No posts available</p>
                            <p className="mt-2 text-sm">The feed appears to be empty. Try refreshing the data.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}