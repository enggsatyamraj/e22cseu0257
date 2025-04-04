'use client';

// src/app/trending/page.js
import { useState } from 'react';
import { useSocial } from '@/context/SocialContext';
import {
    Card,
    CardHeader,
    CardContent,
    LoadingSpinner,
    ErrorMessage,
    Button,
    Badge
} from '@/components/ui';
import PostCard from '@/components/PostCard';
import Unauthorized from '@/components/Unauthorized';

export default function TrendingPage() {
    const {
        isAuthenticated,
        isLoading,
        error,
        trendingPosts,
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
                <h1 className="text-2xl font-bold text-gray-900">Trending Posts</h1>
                <Button
                    onClick={handleRefresh}
                    disabled={isRefreshing || isLoading}
                    variant={isRefreshing ? "secondary" : "primary"}
                    size="sm"
                >
                    {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <div>
                    <Card>
                        <CardHeader title="Posts with the Highest Comment Count" />
                        <CardContent>
                            {trendingPosts.length > 0 ? (
                                <div className="space-y-6">
                                    {trendingPosts.slice(0, 5).map((post, index) => (
                                        <div key={post.id} className="relative">
                                            {index < 3 && (
                                                <div className="absolute -top-2 -left-2 z-10">
                                                    <Badge variant={index === 0 ? "success" : index === 1 ? "warning" : "info"}>
                                                        #{index + 1} Trending
                                                    </Badge>
                                                </div>
                                            )}
                                            <PostCard
                                                post={post}
                                                user={findUser(post.userid)}
                                                commentCount={post.commentCount || 0}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-10 text-center text-gray-500">
                                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    <p className="text-lg">No trending posts available</p>
                                    <p className="mt-2 text-sm">There are no posts with comments yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}