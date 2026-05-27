import { FaTrash, FaEdit } from "react-icons/fa";

function BookCard({
  book,
  onDelete,
  onEdit,
  isAdmin,
}) {
  return (
    <div
      className="
      bg-white/80
      backdrop-blur-lg
      border border-white/20
      rounded-3xl
      p-6
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
    "
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
          {book.title}
        </h2>
      </div>

      <div className="space-y-2 text-gray-600">
        <p>
          <span className="font-semibold text-black">
            Author:
          </span>{" "}
          {book.author}
        </p>

        <p>
          <span className="font-semibold text-black">
            Genre:
          </span>{" "}
          {book.genre}
        </p>

        <p>
          <span className="font-semibold text-black">
            Year:
          </span>{" "}
          {book.year}
        </p>
      </div>

      {isAdmin && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onEdit(book)}
            className="
              flex-1
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              text-white
              py-3
              rounded-xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:scale-105
              transition
            "
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onDelete(book.id)}
            className="
              flex-1
              bg-gradient-to-r
              from-red-500
              to-pink-500
              text-white
              py-3
              rounded-xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:scale-105
              transition
            "
          >
            <FaTrash />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default BookCard;