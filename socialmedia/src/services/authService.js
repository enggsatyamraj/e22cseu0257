// src/services/authService.js

/**
 * Service for handling authentication with the social media analytics API
 */

// API base URL
const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

// Fixed access token - for testing purposes
const FIXED_ACCESS_TOKEN = 'rtCHZJ';

/**
 * Register company with the API server
 * @returns {Promise<Object>} Registration response with clientID and clientSecret
 */
export const registerCompany = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData || {
                "email": "ramkrishna@abc.edu",
                "name": "Ram Krishna",
                "mobileNo": "9999999999",
                "githubUsername": "github",
                "rollNo": "aa1bb",
                "collegeName": "ABC University",
                "accessCode": "rtCHZJ"
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || `Registration failed: ${response.status}`,
                serverResponse: data
            };
        }

        if (typeof window !== 'undefined') {
            // Store credentials in localStorage for future use
            localStorage.setItem('clientCredentials', JSON.stringify({
                email: data.email,
                name: data.name,
                rollNo: data.rollNo,
                accessCode: data.accessCode,
                clientID: data.clientID,
                clientSecret: data.clientSecret
            }));
        }

        return { success: true, data };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            error: error.message || 'Registration failed',
            serverResponse: null
        };
    }
};

/**
 * Get authorization token from API
 * @returns {Promise<string>} Bearer token for API access
 */
export const getAuthToken = async () => {
    try {
        if (typeof window === 'undefined') {
            return null; // We're running on the server
        }

        // Use the fixed access token for testing if available
        if (FIXED_ACCESS_TOKEN) {
            return FIXED_ACCESS_TOKEN;
        }

        // Check if token exists in localStorage and not expired
        const storedToken = localStorage.getItem('authToken');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        if (storedToken && tokenExpiry && Number(tokenExpiry) > Date.now()) {
            return storedToken;
        }

        // Get client credentials from localStorage
        const credentialsStr = localStorage.getItem('clientCredentials');

        if (!credentialsStr) {
            throw new Error('No client credentials found. Please register first.');
        }

        const credentials = JSON.parse(credentialsStr);

        const response = await fetch(`${API_BASE_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": credentials.email,
                "name": credentials.name.toLowerCase(),
                "rollNo": credentials.rollNo,
                "accessCode": credentials.accessCode,
                "clientID": credentials.clientID,
                "clientSecret": credentials.clientSecret
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Auth token request failed: ${response.status}`);
        }

        // Store token and expiry time
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('tokenExpiry', data.expires_in * 1000 + Date.now());

        return data.access_token;
    } catch (error) {
        console.error('Auth token error:', error);
        throw error;
    }
};

/**
 * Make authenticated API request
 * @param {string} endpoint - API endpoint to call
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} API response
 */
export const authenticatedRequest = async (endpoint, options = {}) => {
    try {
        const token = await getAuthToken();

        if (!token) {
            throw new Error('No authentication token available');
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};