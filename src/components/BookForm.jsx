import { useEffect, useState } from "react";

function BookForm({
  onSubmit,
  editingBook,
  setEditingBook,
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || "",
        author: editingBook.author || "",
        genre: editingBook.genre || "",
        year: editingBook.year || "",
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      author: "",
      genre: "",
      year: "",
    });

    setEditingBook(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white/80
        backdrop-blur-lg
        rounded-3xl
        shadow-xl
        p-6
        mb-8
      "
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {editingBook
          ? "✏️ Update Book"
          : "➕ Add New Book"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          className="
            border
            border-gray-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-indigo-400
          "
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          className="
            border
            border-gray-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-indigo-400
          "
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          className="
            border
            border-gray-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-indigo-400
          "
          required
        />

        <input
          type="number"
          name="year"
          placeholder="Publication Year"
          value={formData.year}
          onChange={handleChange}
          className="
            border
            border-gray-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-indigo-400
          "
          required
        />
      </div>

      <div className="flex gap-4 mt-6">

        <button
          type="submit"
          className="
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            text-white
            px-8
            py-4
            rounded-2xl
            font-bold
            hover:scale-105
            transition
            shadow-lg
          "
        >
          {editingBook
            ? "Update Book"
            : "Add Book"}
        </button>

        {editingBook && (
          <button
            type="button"
            onClick={() => {
              setEditingBook(null);

              setFormData({
                title: "",
                author: "",
                genre: "",
                year: "",
              });
            }}
            className="
              bg-gray-300
              text-black
              px-8
              py-4
              rounded-2xl
              font-bold
            "
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;