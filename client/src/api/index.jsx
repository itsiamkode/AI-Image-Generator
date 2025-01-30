const API = axios.create({
  baseURL: '/api',  // Use relative path, Vercel handles the routing
});

export const GetPosts = async () => await API.get('/posts/');
export const CreatePost = async (data) => await API.post('/posts/', data);
export const GenerateImage = async (data) => await API.post('/generateImage/', data);
