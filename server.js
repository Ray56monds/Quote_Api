import express from "express";
import morgan from "morgan";
import authorRouter from "./routes/author.route.js";
import quoteRouter from "./routes/quote.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Set up logging middleware using Morgan
app.use(morgan('dev'));

// Middleware: Parse JSON bodies for POST/PUT requests
app.use(express.json());

// Middleware: Parse URL-encoded bodies for POST/PUT requests
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/api/authors', authorRouter);
app.use('/api/quotes', quoteRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong.');
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});