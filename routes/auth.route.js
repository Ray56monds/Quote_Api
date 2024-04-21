import express from 'express';
import { createUser, loginUser } from '../controllers/auth.Controller.js';

const authRoute = express.Router();

authRoute.post('/register', createUser);
authRoute.post('/login', loginUser);

export default authRoute;