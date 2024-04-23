import express from 'express';
import { createUser, loginUser } from '../controllers/authorController.js';

const authRoute = express.Router();

authRoute.post('/register', createUser);
authRoute.post('/login', loginUser);

export default authRoute;