import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { router as authorRouter } from './routes/author.route.js';
import { router as quoteRouter } from './routes/quote.route.js';
import { router as authRouter } from './routes/auth.route.js';
import { verifyToken } from './middlewares/verifyToken.js';

dotenv.config();
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/authors', verifyToken, authorRouter);
app.use('/api/quotes', verifyToken, quoteRouter);
app.use('/api/auth', authRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});