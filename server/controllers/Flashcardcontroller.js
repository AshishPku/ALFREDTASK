import Flashcard from "../models/Flashcard.js";

export const createFlashcard = async (req, res) => {
  const { question, answer } = req.body;
  const flashcard = new Flashcard({ userId: req.userId, question, answer });
  await flashcard.save();
  res.status(201).json(flashcard);
};

export const getFlashcards = async (req, res) => {
  const flashcards = await Flashcard.find({ userId: req.userId });
  res.json(flashcards);
};

export const updateFlashcard = async (req, res) => {
  const { id } = req.params;
  const { isCorrect } = req.body;
  try {
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    if (isCorrect === "true") {
      flashcard.box += 1;
    } else {
      flashcard.box = 1;
    }
    let daysToAdd;
    if (isCorrect === "true") {
      daysToAdd = Math.pow(2, flashcard.box - 1); // Box 1: 1 day, Box 2: 2 days, Box 3: 4 days, etc.
    } else {
      daysToAdd = 1;
    }
    flashcard.nextReviewDate = new Date(
      Date.now() + daysToAdd * 24 * 60 * 60 * 1000
    );

    await flashcard.save();
    res.json(flashcard);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFlashcard = async (req, res) => {
  const { id } = req.params;
  await Flashcard.findByIdAndDelete(id);
  res.json({ message: "Flashcard deleted successfully" });
};

export const FlashcardDue = async (req, res) => {
  try {
    const currentDate = new Date();

    const dueFlashcards = await Flashcard.find({
      nextReviewDate: { $lte: currentDate },
    });

    res.status(200).json({
      success: true,
      count: dueFlashcards.length,
      data: dueFlashcards,
    });
  } catch (error) {
    console.error("Error fetching due flashcards:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
