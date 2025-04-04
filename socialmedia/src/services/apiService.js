// src/services/apiService.js

import { authenticatedRequest } from './authService';

/**
 * Fetch all users from the social media platform
 * @returns {Promise<Array>} Array of users
 */
export const getUsers = async () => {
    try {
        const response = await authenticatedRequest('/users');
        return response.users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

/**
 * Fetch posts for a specific user
 * @param {string|number} userId - ID of the user
 * @returns {Promise<Array>} Array of posts
 */
export const getUserPosts = async (userId) => {
    try {
        const response = await authenticatedRequest(`/users/${userId}/posts`);
        return response.posts;
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error);
        throw error;
    }
};

/**
 * Fetch all posts (will require additional client-side handling as this isn't directly supported by API)
 * @returns {Promise<Array>} Array of posts from all users
 */
export const getAllPosts = async () => {
    try {
        // First get all users
        const users = await getUsers();

        // Then fetch posts for each user and combine them
        const postsPromises = Object.keys(users).map(async (userId) => {
            try {
                return await getUserPosts(userId);
            } catch (error) {
                console.error(`Error fetching posts for user ${userId}:`, error);
                return []; // Return empty array if there's an error for this user
            }
        });

        const postsArrays = await Promise.all(postsPromises);

        // Flatten the array of arrays
        return postsArrays.flat();
    } catch (error) {
        console.error('Error fetching all posts:', error);
        throw error;
    }
};

/**
 * Fetch comments for a specific post
 * @param {string|number} postId - ID of the post
 * @returns {Promise<Array>} Array of comments
 */
export const getPostComments = async (postId) => {
    try {
        const response = await authenticatedRequest(`/posts/${postId}/comments`);
        return response.comments;
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        throw error;
    }
};

/**
 * Get posts with their comment counts
 * This is a utility function that will fetch all posts and their comments,
 * then calculate the comment count for each post
 * @returns {Promise<Array>} Posts with comment counts
 */
export const getPostsWithCommentCounts = async () => {
    try {
        const posts = await getAllPosts();

        const postsWithComments = await Promise.all(posts.map(async (post) => {
            try {
                const comments = await getPostComments(post.id);
                return {
                    ...post,
                    commentCount: comments.length
                };
            } catch (error) {
                console.error(`Error fetching comments for post ${post.id}:`, error);
                return {
                    ...post,
                    commentCount: 0
                };
            }
        }));

        return postsWithComments;
    } catch (error) {
        console.error('Error getting posts with comment counts:', error);
        throw error;
    }
};

/**
 * Get users with their post counts
 * @returns {Promise<Array>} Users with post counts
 */
export const getUsersWithPostCounts = async () => {
    try {
        // Get all users and their corresponding data
        const usersResponse = await authenticatedRequest('/users');
        const users = Object.entries(usersResponse.users).map(([id, name]) => ({
            id,
            name
        }));

        // Fetch post counts for each user
        const usersWithCounts = await Promise.all(users.map(async (user) => {
            try {
                const posts = await getUserPosts(user.id);
                return {
                    ...user,
                    postCount: posts.length
                };
            } catch (error) {
                console.error(`Error fetching posts for user ${user.id}:`, error);
                return {
                    ...user,
                    postCount: 0
                };
            }
        }));

        return usersWithCounts;
    } catch (error) {
        console.error('Error getting users with post counts:', error);
        throw error;
    }
};