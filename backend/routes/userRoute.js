import express from 'express';
import {  getUserProfile, login, Logout,  regiter_user } from '../controllers/userController.js';
import { validateLogin, validateUserRegistration } from '../validators/userValidator.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register_user', validateUserRegistration, regiter_user)
userRoutes.post('/login_user', validateLogin, login)
userRoutes.get('/get-user-profile', authenticate, getUserProfile);
userRoutes.post('/logout', Logout);
export default userRoutes;
