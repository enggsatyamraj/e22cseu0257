'use client';

// src/context/SocialContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import {
    getUsers,
    getAllPosts,
    getUsersWithPostCounts,
    getPostsWithCommentCounts
} from '@/services/apiService';
import { registerCompany, getAuthToken } from '@/services/authService';

// Create the context
const SocialContext = createContext();

// Custom hook to use the context
export function useSocial() {
    return useContext(SocialContext);
}

// Provider component
export function SocialProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);

    // Initialize authentication
    useEffect(() => {
        const initAuth = async () => {
            try {
                setIsLoading(true);

                // Check if we already have credentials
                let credentials;
                if (typeof window !== 'undefined') {
                    credentials = localStorage.getItem('clientCredentials');
                }

                if (!credentials) {
                    // Register if we don't have credentials
                    await registerCompany();
                }

                // Get an auth token
                const token = await getAuthToken();

                if (token) {
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.error('Authentication error:', err);
                setError('Failed to authenticate with the server');
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Load data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadAllData();
        }
    }, [isAuthenticated]);

    // Function to load all data
    const loadAllData = async () => {
        try {
            setIsLoading(true);

            // Get users with post counts
            const usersWithCounts = await getUsersWithPostCounts();
            setUsers(usersWithCounts);

            // Get top 5 users by post count
            const sortedUsers = [...usersWithCounts].sort((a, b) => b.postCount - a.postCount);
            setTopUsers(sortedUsers.slice(0, 5));

            // Get posts with comment counts
            const postsWithComments = await getPostsWithCommentCounts();
            setPosts(postsWithComments);

            // Get trending posts (highest comment count)
            const sortedPosts = [...postsWithComments].sort((a, b) => b.commentCount - a.commentCount);
            setTrendingPosts(sortedPosts);

            // Get latest posts (assuming the API returns them in chronological order, or we'd sort by timestamp)
            // For this example, we'll just use the post IDs as a proxy for recency
            const sortedByRecent = [...postsWithComments].sort((a, b) => b.id - a.id);
            setLatestPosts(sortedByRecent);

        } catch (err) {
            console.error('Data loading error:', err);
            setError('Failed to load data from the server');
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh data
    const refreshData = () => {
        if (isAuthenticated) {
            loadAllData();
        }
    };

    // Context value
    const value = {
        isAuthenticated,
        isLoading,
        error,
        users,
        posts,
        topUsers,
        trendingPosts,
        latestPosts,
        refreshData
    };

    return (
        <SocialContext.Provider value={value}>
            {children}
        </SocialContext.Provider>
    );
}