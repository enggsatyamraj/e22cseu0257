'use client';

// src/components/PostCard.js
import React from 'react';
import { Card, CardContent, UserAvatar } from './ui';
import PlaceholderImage from './ui/PlaceholderImage';

export default function PostCard({ post, user, commentCount = 0 }) {
    // Generate a consistent color for the post based on its ID
    const getPostColor = (postId) => {
        const colors = [
            '#E6F7FF', // light blue
            '#FFF7E6', // light orange
            '#F6FFED', // light green
            '#FCF5FF', // light purple
            '#FFF1F0', // light red
        ];

        return colors[postId % colors.length];
    };

    // Get a random image theme based on the post content
    const getImageTheme = (content) => {
        const themes = ['nature', 'city', 'abstract', 'people', 'technology'];
        let sum = 0;
        for (let i = 0; i < content.length; i++) {
            sum += content.charCodeAt(i);
        }
        return themes[sum % themes.length];
    };

    // Create a more descriptive placeholder text based on the post content
    const getPlaceholderText = (content) => {
        const words = content.split(' ');
        if (words.length <= 2) return content;
        return words.slice(0, 2).join(' ') + '...';
    };

    return (
        <Card className="mb-4 overflow-hidden">
            <CardContent className="p-0">
                <div className="p-4" style={{ backgroundColor: getPostColor(post.id) }}>
                    <div className="flex items-start space-x-3">
                        <UserAvatar name={user?.name || 'Unknown User'} />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-gray-900">{user?.name || 'Unknown User'}</h4>
                                <span className="text-xs text-gray-500">
                                    ID: {post.id}
                                </span>
                            </div>
                            <p className="text-gray-700">{post.content}</p>
                        </div>
                    </div>
                </div>

                {/* Visual representation of the post */}
                <div className="flex justify-center bg-gray-50">
                    <PlaceholderImage
                        width={400}
                        height={200}
                        text={getPlaceholderText(post.content)}
                        bgColor={getPostColor(post.id)}
                        className="w-full"
                    />
                </div>

                <div className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            User: {user?.name || 'Unknown'}
                        </div>
                        <div className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                            {commentCount} comments
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}