import { FaTimes } from "react-icons/fa";

function SearchBar({
  search,
  setSearch,
  genre,
  setGenre,
  books,
}) {

  const genres = [
    ...new Set(
      books.map((book) => book.genre)
    ),
  ];

  return (
    <div
      className="
        bg-white/80
        backdrop-blur-lg
        p-5
        rounded-3xl
        shadow-lg
        mb-8
        flex
        flex-col
        md:flex-row
        gap-4
      "
    >
      <div className="relative flex-1">

        <input
          type="text"
          placeholder="🔍 Search by title, author, genre or year..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            border
            border-gray-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-indigo-400
            pr-12
          "
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
              hover:text-red-500
              transition
            "
          >
            <FaTimes />
          </button>
        )}
      </div>

      <select
        value={genre}
        onChange={(e) =>
          setGenre(e.target.value)
        }
        className="
          border
          border-gray-200
          p-4
          rounded-2xl
          outline-none
          focus:ring-2
          focus:ring-indigo-400
        "
      >
        <option value="">
          All Genres
        </option>

        {genres.map((genreItem) => (
          <option
            key={genreItem}
            value={genreItem}
          >
            {genreItem}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;