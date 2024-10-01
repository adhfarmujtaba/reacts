"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPosts = exports.fetchPostById = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// You can set the base URL for all requests
// Consider storing this value in an environment variable for different environments (development, production, etc.)
const API_BASE_URL = 'https://leaknews.net/apis';

// Function to fetch all posts
const fetchPosts = async () => {
  try {
    const response = await _axios.default.get(`${API_BASE_URL}?posts`);
    return response.data; // Adjust this based on the actual structure of your API response
  } catch (error) {
    // Handle error
    console.error("Error fetching posts:", error);
    throw error; // Re-throwing the error after logging it, so the calling function can handle it
  }
};

// Function to fetch a single post by ID
exports.fetchPosts = fetchPosts;
const fetchPostById = async postId => {
  try {
    const response = await _axios.default.get(`${API_BASE_URL}?post_id=${postId}`);
    return response.data; // Adjust this based on the actual structure of your API response
  } catch (error) {
    // Handle error
    console.error(`Error fetching post with ID ${postId}:`, error);
    throw error;
  }
};

// Add more API functions as needed
exports.fetchPostById = fetchPostById;