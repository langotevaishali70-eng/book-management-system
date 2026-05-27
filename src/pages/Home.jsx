import { useEffect, useState } from "react";

import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
} from "../api/bookApi";

import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

function Home() {

  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [genre, setGenre] =
    useState("");

  const [editingBook, setEditingBook] =
    useState(null);

  const [isAdmin, setIsAdmin] =
    useState(
        sessionStorage.getItem("isAdmin") ===
        "true"
    );

  const [showLogin, setShowLogin] =
    useState(false);

  const [credentials, setCredentials] =
    useState({
      username: "",
      password: "",
    });

  const [loginError, setLoginError] =
    useState("");

  const today =
    new Date().toLocaleDateString();

  const savedActivities =
    JSON.parse(
      localStorage.getItem(
        "activities"
      )
    ) || [];

  const todayActivities =
    savedActivities.filter(
      (activity) =>
        activity.date === today
    );

  const [activities, setActivities] =
    useState(todayActivities);

  const [showActivity, setShowActivity] =
    useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {

    try {

      const data =
        await getBooks();

      setBooks(data.reverse());

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const handleAddBook = async (
    book
  ) => {

    try {

      if (editingBook) {

        const updated =
          await updateBook(
            editingBook.id,
            book
          );

        setBooks(
          books.map((b) =>
            b.id ===
            editingBook.id
              ? updated
              : b
          )
        );

        setActivities((prev) => {

          const updatedActivities =
            [
              {
                action:
                  "Edited",

                ...updated,

                time:
                  new Date().toLocaleString(),

                date:
                  new Date().toLocaleDateString(),
              },

              ...prev,
            ];

          localStorage.setItem(
            "activities",

            JSON.stringify(
              updatedActivities
            )
          );

          return updatedActivities;
        });

        setEditingBook(null);

      } else {

        const newBook =
          await addBook(book);

        setBooks([
          newBook,
          ...books,
        ]);

        setActivities((prev) => {

          const updatedActivities =
            [
              {
                action:
                  "Added",

                ...newBook,

                time:
                  new Date().toLocaleString(),

                date:
                  new Date().toLocaleDateString(),
              },

              ...prev,
            ];

          localStorage.setItem(
            "activities",

            JSON.stringify(
              updatedActivities
            )
          );

          return updatedActivities;
        });
      }

    } catch (error) {

      console.log(error);
    }
  };

  const handleDelete = async (
    id
  ) => {

    try {

      const deletedBook =
        books.find(
          (book) =>
            book.id === id
        );

      await deleteBook(id);

      setActivities((prev) => {

        const updatedActivities =
          [
            {
              action:
                "Deleted",

              ...deletedBook,

              time:
                new Date().toLocaleString(),

              date:
                new Date().toLocaleDateString(),
            },

            ...prev,
          ];

        localStorage.setItem(
          "activities",

          JSON.stringify(
            updatedActivities
          )
        );

        return updatedActivities;
      });

      setBooks(
        books.filter(
          (book) =>
            book.id !== id
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

  const handleLogin = (e) => {

    e.preventDefault();

    if (
      credentials.username.trim() ===
        "" ||

      credentials.password.trim() ===
        ""
    ) {

      setLoginError(
        "Username and Password are required"
      );

      return;
    }

    if (
      credentials.username ===
        "admin" &&

      credentials.password ===
        "admin123"
    ) {

      setIsAdmin(true);

      sessionStorage.setItem(
        "isAdmin",
        "true"
        );

      setShowLogin(false);

      setLoginError("");

      setCredentials({
        username: "",
        password: "",
      });

    } else {

      setLoginError(
        "Invalid Username or Password"
      );
    }
  };

  const filteredBooks =
    books.filter((book) => {

      const matchesSearch =

        book.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        book.author
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        book.genre
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        book.year
          .toString()
          .includes(search);

      const matchesGenre =

        genre === "" ||

        book.genre === genre;

      return (
        matchesSearch &&
        matchesGenre
      );
    });

  if (loading)
    return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100">

      <Navbar
        isAdmin={isAdmin}
        setShowLogin={
          setShowLogin
        }
        setIsAdmin={
          setIsAdmin
        }
      />

      <div className="max-w-7xl mx-auto p-5">

        {isAdmin && (
          <BookForm
            onSubmit={
              handleAddBook
            }
            editingBook={
              editingBook
            }
            setEditingBook={
              setEditingBook
            }
          />
        )}

        <SearchBar
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          books={books}
        />

        {isAdmin && (
          <div className="flex justify-end mb-6">

            <button
              onClick={() =>
                setShowActivity(
                  true
                )
              }
              className="
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-bold
                shadow-lg
                hover:scale-105
                transition
              "
            >
              📋 Activity
            </button>

          </div>
        )}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          {filteredBooks.map(
            (book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={
                  handleDelete
                }
                onEdit={
                  setEditingBook
                }
                isAdmin={
                  isAdmin
                }
              />
            )
          )}

        </div>
      </div>

      {showLogin && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            justify-center
            items-center
            z-50
          "
        >

          <form
            onSubmit={
              handleLogin
            }
            className="
              bg-white
              p-8
              rounded-3xl
              w-[90%]
              max-w-md
              shadow-2xl
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Admin Login
            </h2>

            {loginError && (
              <p
                className="
                  bg-red-100
                  text-red-600
                  p-3
                  rounded-xl
                  mb-4
                  text-sm
                  font-semibold
                "
              >
                {loginError}
              </p>
            )}

            <input
              type="text"
              placeholder="Username"
              value={
                credentials.username
              }
              onChange={(e) =>
                setCredentials({
                  ...credentials,

                  username:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                p-4
                rounded-2xl
                mb-4
              "
            />

            <input
              type="password"
              placeholder="Password"
              minLength={6}
              value={
                credentials.password
              }
              onChange={(e) =>
                setCredentials({
                  ...credentials,

                  password:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                p-4
                rounded-2xl
                mb-6
              "
            />

            <button
              className="
                w-full
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                py-4
                rounded-2xl
                font-bold
                hover:scale-105
                transition
              "
            >
              Login
            </button>

          </form>
        </div>
      )}

      {showActivity && (
            <div
                className="
                fixed
                inset-0
                bg-black/60
                backdrop-blur-sm
                flex
                justify-center
                items-center
                z-50
                p-4
                "
            >

                <div
                className="
                    w-full
                    max-w-5xl
                    rounded-[30px]
                    overflow-hidden
                    shadow-2xl
                    bg-white
                "
                >

                <div
                    className="
                    bg-gradient-to-r
                    from-indigo-600
                    via-purple-600
                    to-pink-500
                    p-7
                    flex
                    justify-between
                    items-center
                    "
                >

                    <div>

                    <h2 className="text-4xl font-bold text-white">
                        📋 Activity History
                    </h2>

                    <p className="text-white/80 mt-2">
                        Track all admin actions
                    </p>

                    </div>

                    <button
                    onClick={() =>
                        setShowActivity(false)
                    }
                    className="
                        bg-white
                        text-black
                        px-5
                        py-3
                        rounded-2xl
                        font-bold
                        hover:scale-105
                        transition
                    "
                    >
                    Close
                    </button>

                </div>

                <div
                    className="
                    bg-gradient-to-br
                    from-slate-100
                    via-indigo-50
                    to-purple-50
                    p-6
                    max-h-[75vh]
                    overflow-y-auto
                    "
                >

                    {activities.length === 0 ? (

                    <div
                        className="
                        flex
                        flex-col
                        justify-center
                        items-center
                        py-24
                        "
                    >

                        <div className="text-8xl mb-5">
                        📭
                        </div>

                        <h3 className="text-3xl font-bold text-gray-700">
                        No Activity Yet
                        </h3>

                        <p className="text-gray-500 mt-3">
                        Today's admin activity will appear here
                        </p>

                    </div>

                    ) : (

                    <div className="space-y-6">

                        {activities.map(
                        (activity, index) => (

                            <div
                            key={index}
                            className="
                                bg-white/90
                                backdrop-blur-lg
                                border
                                border-white/20
                                rounded-3xl
                                p-6
                                shadow-lg
                                hover:shadow-2xl
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            "
                            >

                            <div className="flex justify-between items-start mb-6">

                                <div>

                                <span
                                    className={`
                                    px-5
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-bold
                                    text-white

                                    ${
                                        activity.action ===
                                        "Added"
                                        ? "bg-green-500"
                                        : activity.action ===
                                            "Edited"
                                        ? "bg-blue-500"
                                        : "bg-red-500"
                                    }
                                    `}
                                >
                                    {activity.action}
                                </span>

                                </div>

                                <div className="text-right">

                                <p className="text-sm text-gray-500">
                                    {activity.time}
                                </p>

                                </div>

                            </div>

                            <div className="grid md:grid-cols-2 gap-5">

                                <div
                                className="
                                    bg-slate-50
                                    p-5
                                    rounded-2xl
                                "
                                >

                                <p className="text-sm text-gray-500 mb-1">
                                    📚 Title
                                </p>

                                <h3 className="text-xl font-bold text-gray-800">
                                    {activity.title}
                                </h3>

                                </div>

                                <div
                                className="
                                    bg-slate-50
                                    p-5
                                    rounded-2xl
                                "
                                >

                                <p className="text-sm text-gray-500 mb-1">
                                    ✍️ Author
                                </p>

                                <h3 className="text-xl font-bold text-gray-800">
                                    {activity.author}
                                </h3>

                                </div>

                                <div
                                className="
                                    bg-slate-50
                                    p-5
                                    rounded-2xl
                                "
                                >

                                <p className="text-sm text-gray-500 mb-1">
                                    🎭 Genre
                                </p>

                                <h3 className="text-xl font-bold text-gray-800">
                                    {activity.genre}
                                </h3>

                                </div>

                                <div
                                className="
                                    bg-slate-50
                                    p-5
                                    rounded-2xl
                                "
                                >

                                <p className="text-sm text-gray-500 mb-1">
                                    📅 Year
                                </p>

                                <h3 className="text-xl font-bold text-gray-800">
                                    {activity.year}
                                </h3>

                                </div>

                            </div>

                            </div>
                        )
                        )}

                    </div>
                    )}

                </div>

                </div>

            </div>
            )}

<div
  className="
    mt-16
    text-center
    text-gray-600
    pb-10
  "
>
  <p className="text-lg font-semibold">
    BookVerse © 2026
  </p>

  <p className="mt-2 text-sm">
    Created by
    <span className="font-bold text-indigo-600">
      {" "}
      Vaishali Langote
    </span>
  </p>
</div>
    </div>
  );
}

export default Home;