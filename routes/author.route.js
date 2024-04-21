import express from "express";
import { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController.js';

const authorRoute = express.Router();

authorRoute.get("/", getAllAuthors);
authorRoute.get("/:id", getAuthor);
authorRoute.post("/", createAuthor);
authorRoute.put("/:id", updateAuthor);
authorRoute.delete("/:id", deleteAuthor);

export default authorRoute