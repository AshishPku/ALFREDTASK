const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="container mx-auto flex justify-center">
        <a to="/" className="text-white text-3xl font-bold">
          Flashcard Learning App
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
