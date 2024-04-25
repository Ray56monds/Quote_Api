import express from "express";
import asyncHandler from "express-async-handler";
import { isAdmin, isUserORAdmin } from "../utils/middleware.js";
import { validateReqAuthor, validateUpdateReqAuthor } from "../utils/validate.js";
import { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from "../controllers/authorController.js";
import jwtAuth from "../utils/jwt-auth.js";

const authorRoute = express.Router();

// Route to get all authors
authorRoute.get('/', asyncHandler(getAllAuthors));

// Route to a single author by ID
authorRoute.get('/:id', asyncHandler(getAuthor));

// Route to create a new author, protected by jwtAuth middleware
authorRoute.post('/', jwtAuth, validateReqAuthor, asyncHandler(createAuthor));

// Route to update an existing author, accessible to both users and admins
authorRoute.put('/:id', jwtAuth, isUserORAdmin, validateUpdateReqAuthor, asyncHandler(updateAuthor));

// Route to delete an author, protected by isAdmin middleware and jwtAuth middleware
authorRoute.delete('/:id', isAdmin, jwtAuth, asyncHandler(deleteAuthor));

export default authorRoute