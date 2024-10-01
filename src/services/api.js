import axios from 'axios';

// You can set the base URL for all requests
// Consider storing this value in an environment variable for different environments (development, production, etc.)
const API_BASE_URL = 'https://leaknews.net/apis';

// Function to fetch all posts
export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}?posts`);
        return response.data; // Adjust this based on the actual structure of your API response
    } catch (error) {
        // Handle error
        console.error("Error fetching posts:", error);
        throw error; // Re-throwing the error after logging it, so the calling function can handle it
    }
};

// Function to fetch a single post by ID
export const fetchPostById = async (postId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?post_id=${postId}`);
        return response.data; // Adjust this based on the actual structure of your API response
    } catch (error) {
        // Handle error
        console.error(`Error fetching post with ID ${postId}:`, error);
        throw error;
    }
};

// Add more API functions as needed
