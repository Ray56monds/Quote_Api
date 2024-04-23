import express from "express";
import { getAllQuotes, getQuote, createQuote, updateQuote, deleteQuote } from '../controllers/quoteController.js';

const quoteRoute = express.Router();

quoteRoute.get("/", getAllQuotes);
quoteRoute.get("/:id", getQuote);
quoteRoute.get("/", createQuote);
quoteRoute.put("/:id", updateQuote);
quoteRoute.delete("/:id", deleteQuote);

export default quoteRoute