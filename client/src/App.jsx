import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddFlashcard from "./components/AddFlashCard";
import Header from "./components/Header";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [showAddFlashcard, setShowAddFlashcard] = useState(false);

  // Fetch flashcards from the backend when the component mounts
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/flashcards"
        );
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, []);
  const handleAddFlashcard = async (newFlashcard) => {
    try {
      setFlashcards([...flashcards, newFlashcard]);
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                flashcards={flashcards}
                onAddFlashcard={() => setShowAddFlashcard(true)}
              />
            }
          />
          <Route
            path="/addflashcard"
            element={
              showAddFlashcard && (
                <AddFlashcard
                  onAdd={handleAddFlashcard}
                  onClose={() => {
                    setShowAddFlashcard(false);
                  }}
                />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
