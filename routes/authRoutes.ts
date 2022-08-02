import express from 'express'
import { signin, signup, logout } from '../controller/authController';
export const authRoutes = express.Router();

authRoutes.post('/signup',signup)
authRoutes.post('/login',signin)
authRoutes.get('/logout',logout)