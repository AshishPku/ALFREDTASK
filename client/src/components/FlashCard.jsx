import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Flashcard = ({ flashcard, onUpdate }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const handleReview = async (isCorrect) => {
    try {
      await axios.put(`/api/flashcards/${flashcard._id}`, { isCorrect });
      onUpdate(flashcard._id); // Notify parent component (Dashboard) to update the list
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };
  return (
    <div className="perspective">
      <motion.div
        className="relative w-64 h-40"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: showAnswer ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Front of the Card */}
        <motion.div
          className="absolute w-full h-full bg-white border rounded-lg p-4 flex flex-col justify-center items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-xl font-bold text-center">
            {flashcard.question}
          </h3>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
        </motion.div>

        {/* Back of the Card */}
        <motion.div
          className="absolute w-full h-full bg-white border rounded-lg p-4 flex flex-col justify-center items-center"
          style={{ backfaceVisibility: "hidden", rotateY: 180 }}
        >
          <p className="text-xl font-bold text-center">{flashcard.answer}</p>
          <div className="mt-4 flex space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setShowAnswer(false);
                handleReview(true);
              }}
            >
              Got it right
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setShowAnswer(false);
                handleReview(false);
              }}
            >
              Got it wrong
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
