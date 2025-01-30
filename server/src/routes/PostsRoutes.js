import { Router } from "express";
import { createPost, getAllPosts } from "../controller/PostsController.js";

const router = Router()
router.get('/testing', ()=>{
    console.log('Helllllooo World')
})
router.get('/', getAllPosts)
router.post('/', createPost)

export default router