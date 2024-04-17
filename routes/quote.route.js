import express from "express";
import { getAllQuotes, getQuote, createQuote, updateQuote, deleteQuote } from '../controllers/quoteController.js';

const router = express.Router();

router.get("/", getAllQuotes);
router.get("/:id", getQuote);
router.get("/", createQuote);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);

export default router