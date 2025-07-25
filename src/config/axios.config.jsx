// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     timeout: 30000,
//     timeoutErrorMessage: "Server time out",
//     headers: {
//         "Content-Type": "application/json"
//     }
// });

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response.data;
//     },
//     (exception) => {
//         if (exception.code === 'ERR_BAD_REQUEST') {
//             throw exception.response.data;
//         } else {
//             console.log("ResponseInterceptor:", exception);
//         }
//     }
// );

// export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "Server time out",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    if (status === 400) {
      return Promise.reject(error.response.data);
    }

    console.error("ResponseInterceptor:", error);
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
