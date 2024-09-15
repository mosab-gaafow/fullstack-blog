import express from 'express';
import mongoose from "mongoose";
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/postController.js';
import { validatePosts } from '../validators/postValidators.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const postRoute = express.Router();


postRoute.post('/', validatePosts, authenticate, createPost)
postRoute.get('/get-post/:id', getPostById)
postRoute.get('/get-posts', getPosts)
postRoute.post('/update-post/:id', authenticate, updatePost)
postRoute.delete('/delete-post/:id', authenticate, deletePost)



export default postRoute;



