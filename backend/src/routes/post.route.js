import Router from "express";
import { createPost, getAllPosts, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.post('/create', createPost);
router.get('/getPosts', getAllPosts);
router.patch('/update/:id', updatePost);
// router.get('/posts/:id', getPostById);
router.delete('/delete/:id', deletePost);

export default router;