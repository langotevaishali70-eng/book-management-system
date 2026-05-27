import axiosInstance from "../services/axiosInstance";

export const getBooks = async () => {
  const response = await axiosInstance.get("/books");

  return response.data;
};

export const addBook = async (book) => {
  const response = await axiosInstance.post("/books", book);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};

export const updateBook = async (id, updatedBook) => {
  const response = await axiosInstance.put(
    `/books/${id}`,
    updatedBook
  );

  return response.data;
};