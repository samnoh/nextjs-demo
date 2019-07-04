import axios from 'axios';

export const getPosts = () => axios.get(`https://jsonplaceholder.typicode.com/posts`);

export const getCommentsById = id =>
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);

export const postUser = formData =>
    axios.post('/api/user/login', formData, {
        withCredentials: true
    });

export const postLogout = () => axios.post('/api/user/logout', {}, { withCredentials: true });

export const checkLogin = () => axios.get('/api/user', { withCredentials: true });
