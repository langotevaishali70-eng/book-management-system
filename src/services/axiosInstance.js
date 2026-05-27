import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://6a16620e1b90031f81b0f78d.mockapi.io/api/books",
});

export default axiosInstance;