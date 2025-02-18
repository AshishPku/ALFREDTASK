import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"; // Import toast

// eslint-disable-next-line react/prop-types
const Dashboard = ({ onAddFlashcard }) => {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([]);
  const [showAnswerId, setShowAnswerId] = useState(null);
  const [dueCount, setDueCount] = useState(0);

  useEffect(() => {
    const fetchDueFlashcards = async () => {
      try {
        const response = await axios.get("/api/flashcards/due");
        setFlashcards(response.data.data);
        setDueCount(response.data.count);
      } catch (error) {
        toast.error("❌ Error fetching flashcards!");
      }
    };
    fetchDueFlashcards();
  }, []);

  const handleAddFlashcardClick = () => {
    onAddFlashcard();
    navigate("/addflashcard");
    toast.info("➕ Redirecting to add flashcard...");
  };

  const handleShowAnswer = (id) => {
    setShowAnswerId(id === showAnswerId ? null : id);
  };

  const handleUpdateFlashcard = async (id, isCorrect) => {
    try {
      const response = await axios.put(`/api/flashcards/${id}`, {
        isCorrect: isCorrect.toString(),
      });

      setFlashcards((prevFlashcards) =>
        prevFlashcards.map((flashcard) =>
          flashcard._id === id ? response.data : flashcard
        )
      );

      const dueResponse = await axios.get("/api/flashcards/due");
      setFlashcards(dueResponse.data.data);
      setDueCount(dueResponse.data.count);

      toast.success(`📦 Moved to Box ${response.data.box}`, { duration: 3000 });
    } catch (error) {
      toast.error("❌ Error updating flashcard!");
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`/api/flashcards/${id}`);
      setFlashcards((prevFlashcards) =>
        prevFlashcards.filter((flashcard) => flashcard._id !== id)
      );
      setDueCount((prevCount) => prevCount - 1);
      toast.success("🗑 Flashcard deleted successfully!", { duration: 3000 });
    } catch (error) {
      toast.error("❌ Error deleting flashcard!");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          📚 Flashcards
        </h1>
        <button
          onClick={handleAddFlashcardClick}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-xl"
        >
          ➕ Add Flashcard
        </button>
        <p className="text-lg text-gray-700 font-medium bg-gray-100 px-4 py-2 rounded-lg shadow">
          🔥 You have <span className="text-red-500 font-bold">{dueCount}</span>{" "}
          flashcards due today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((flashcard) => (
          <motion.div
            key={flashcard._id}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Dates at the top */}
            <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded-lg shadow mb-3">
              <p>
                📅 Next Review:{" "}
                {new Date(flashcard.nextReviewDate).toLocaleDateString()}
              </p>
              <p>
                🕒 Created: {new Date(flashcard.createdAt).toLocaleDateString()}
              </p>
              <p>
                🔄 Last Updated:{" "}
                {new Date(flashcard.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Flashcard Question */}
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-3">
              {flashcard.question}
            </h2>

            {/* Answer Reveal with Animation */}
            {showAnswerId === flashcard._id && (
              <motion.p
                className="text-gray-700 bg-gray-100 p-4 rounded-lg shadow-md transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {flashcard.answer}
              </motion.p>
            )}

            {/* Buttons in a single flex container */}
            <motion.div
              className="mt-4 flex justify-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.button
                onClick={() => handleShowAnswer(flashcard._id)}
                className="bg-gray-700 text-white font-semibold px-4 py-2 rounded shadow-md transition hover:bg-gray-800 hover:shadow-lg text-sm"
                whileTap={{ scale: 0.9 }}
              >
                {showAnswerId === flashcard._id
                  ? "🙈 Hide Answer"
                  : "👀 Show Answer"}
              </motion.button>

              {showAnswerId === flashcard._id && (
                <>
                  <motion.button
                    onClick={() => handleUpdateFlashcard(flashcard._id, true)}
                    className="bg-green-500 text-white font-semibold px-4 py-2 rounded shadow-md transition hover:bg-green-600 hover:shadow-lg text-sm"
                    whileTap={{ scale: 0.9 }}
                  >
                    ✅ Got it right
                  </motion.button>
                  <motion.button
                    onClick={() => handleUpdateFlashcard(flashcard._id, false)}
                    className="bg-red-500 text-white font-semibold px-4 py-2 rounded shadow-md transition hover:bg-red-600 hover:shadow-lg text-sm"
                    whileTap={{ scale: 0.9 }}
                  >
                    ❌ Got it wrong
                  </motion.button>
                </>
              )}

              <motion.button
                onClick={() => handleDeleteFlashcard(flashcard._id)}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-4 py-2 rounded shadow-md transition hover:scale-105 hover:shadow-xl text-sm"
                whileTap={{ scale: 0.9 }}
              >
                🗑 Delete
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
