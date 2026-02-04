// Set the base URL for the API. 
// Uses environment variable VITE_API_URL if available, otherwise defaults to production.
const VITE_API_URL = import.meta.env.VITE_API_URL;

const API_BASE_URL = VITE_API_URL && VITE_API_URL.trim() !== ""
    ? VITE_API_URL
    : "https://ths-backend-pvu4.onrender.com";

// Debugging: Log the API URL being used to help resolve connection issues.
if (import.meta.env.DEV) {
    console.log(`[API Config] Using URL: ${API_BASE_URL}`);
}

export default API_BASE_URL;
