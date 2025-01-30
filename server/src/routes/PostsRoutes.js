import { Router } from "express";
import { createPost, getAllPosts } from "../controller/PostsController.js";

const router = Router()
router.get('/testing', (req, res)=>{
    res.send('Helllllooo World')
})
router.get('/', getAllPosts)
router.post('/', createPost)

export default router