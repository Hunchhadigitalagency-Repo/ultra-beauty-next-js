import axios from "axios";

// Create an Axios instance
const apiBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default apiBase;