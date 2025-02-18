import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AddFlashcard = ({ onAdd, onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/flashcards",
        {
          question,
          answer,
        }
      );
      onAdd(response.data);
      setQuestion("");
      setAnswer("");
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg w-full max-w-md"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mb-6">
            ✨ Add New Flashcard
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📝 Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your question..."
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💡 Answer
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter the answer..."
                required
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 hover:bg-gray-600"
                onClick={() => handleClose()}
              >
                ❌ Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                ➕ Add Flashcard
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddFlashcard;
