function Navbar({
  isAdmin,
  setShowLogin,
  setIsAdmin,
}) {

  const handleLogout = () => {

    setIsAdmin(false);

    sessionStorage.removeItem(
      "isAdmin"
    );
  };

  return (
    <div
      className="
        bg-gradient-to-r
        from-indigo-600
        via-purple-600
        to-pink-500
        shadow-xl
        sticky
        top-0
        z-40
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          py-5
          flex
          justify-between
          items-center
        "
      >

        <div>

          <h1
            className="
              text-white
              text-3xl
              md:text-4xl
              font-bold
              tracking-wide
            "
          >
            📚 BookVerse
          </h1>

          <p className="text-white/80 text-sm mt-1">
            Book Management System
          </p>

        </div>

        {isAdmin ? (

          <button
            onClick={handleLogout}
            className="
              bg-white
              text-black
              px-6
              py-3
              rounded-2xl
              font-bold
              hover:scale-105
              transition
              shadow-lg
            "
          >
            Logout
          </button>

        ) : (

          <button
            onClick={() =>
              setShowLogin(true)
            }
            className="
              bg-white
              text-black
              px-6
              py-3
              rounded-2xl
              font-bold
              hover:scale-105
              transition
              shadow-lg
            "
          >
            Admin Login
          </button>

        )}

      </div>

    </div>
  );
}

export default Navbar;