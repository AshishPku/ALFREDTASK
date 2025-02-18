import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  box: {
    type: Number,
    default: 1,
  }, // Leitner box (1, 2, 3, etc.)
  nextReviewDate: {
    type: Date,
    default: Date.now,
  }, // Next review date
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
