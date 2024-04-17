import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoute from './routes/auth.route.js';
import authorRoute from './routes/author.route.js';
import quoteRoute from './routes/quote.route.js';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env file
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/authors', authorRoute);
app.use('/api/quotes', quoteRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});