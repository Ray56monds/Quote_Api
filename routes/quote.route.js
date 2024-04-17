import express from "express";
import {
  getQuote,
  getAllQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
} from "../controllers/quoteController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getQuote);
router.get("/", verifyToken, getAllQuotes);
router.post("/", verifyToken, createQuote);
router.put("/:id", verifyToken, updateQuote);
router.delete("/:id", verifyToken, deleteQuote);

export default router;