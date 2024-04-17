import express from "express";
import {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthor);
router.post("/", verifyToken, createAuthor);
router.put("/:id", verifyToken, updateAuthor);
router.delete("/:id", verifyToken, deleteAuthor);

export default router;