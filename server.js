import express from 'express';
import morgan from 'morgan';
import authorRoute from './routes/author.route.js';
import quoteRoute from './routes/quote.route.js';


// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello, World!')
});

// Routes
app.use('/api/authors', authorRoute);
app.use('/api/quotes', quoteRoute);

export default app;