import { Router } from 'express';
import { CreatePost, deletePost, getPosts, getSinglePost, updatePost } from '../controllers/post.controller.js';
const router = Router();

router.post('/createpost', CreatePost)
router.get('/getposts', getPosts)
router.get('/getsinglepost', getSinglePost)
router.delete('/deletepost', deletePost)
router.put('/updatepost', updatePost)


export default router;