import axios from 'axios';

export const getPosts = () => axios.get(`https://jsonplaceholder.typicode.com/posts`);

export const getCommentsById = id =>
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
