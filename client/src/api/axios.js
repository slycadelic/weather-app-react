import axios from 'axios';
const BASE_URL = 'http://localhost:3500';

export default axios.create({
    baseURL: BASE_URL
});

// withCredentials: true allows us to send cookies with the request
// Also we attach interceptors to this axiosPrivate that will attach 
// the JWT tokens for us. It will refresh the token if our initial token
// has expired automatically 
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});