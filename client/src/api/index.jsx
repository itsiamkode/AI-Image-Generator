import axios from 'axios'

const API = axios.create({
  baseURL: 'https://aiimagica.vercel.app/api',  // Use relative path, Vercel handles the routing
});

export const GetPosts = async () => await API.get('/posts');
export const CreatePost = async (data) => await API.post('/posts', data);
export const GenerateImage = async (data) => await API.post('/generateImage', data);
