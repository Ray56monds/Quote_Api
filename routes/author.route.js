import express from "express";
import { isAdmin } from "../utils/middleware.js";
import jwtAuth from "../utils/jwt-auth.js";
import { validate, authorSchema } from "../utils/validate.js";
import { getAllAuthors, getAuthor, updateAuthor, deleteAuthor, loginUser, registerUser } from "../controllers/authorController.js";

const authorRoute = express.Router();

// Route to get all authors
authorRoute.get('/', [jwtAuth, isAdmin], getAllAuthors);

// Route to a single author by ID
authorRoute.get('/:id', getAuthor);

// Route to register a new author
authorRoute.post('/auth/register', validate(authorSchema), registerUser);

// Route to login registered user
authorRoute.post('/auth/login', loginUser);

// Route to update an existing author, accessible to both users and admins
authorRoute.put('/:id',  updateAuthor);

// Route to delete an author, protected by isAdmin middleware and jwtAuth middleware
authorRoute.delete('/:id', [jwtAuth, isAdmin], deleteAuthor);

export default authorRoute