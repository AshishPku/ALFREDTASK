import express from "express";
import {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
  FlashcardDue,
} from "../controllers/Flashcardcontroller.js"; // Add .js extension

const router = express.Router();

router.post("/", createFlashcard);
router.get("/", getFlashcards);
router.get("/due", FlashcardDue);
router.put("/:id", updateFlashcard);
router.delete("/:id", deleteFlashcard);

export default router;
