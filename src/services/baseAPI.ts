import axios from "axios";
import store from "store/store";


const baseAPI = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
  },
});

baseAPI.interceptors.request.use((config) => {
  // config là thông tin của request sẽ được gửi lên server
  // Kiểm tra xem user đã đăng nhập hay chưa để lấy accessToken gắn vào headers
  if (config.headers) {
    if (store.getState().auth.userCurrent) {
      const { token } = store.getState().auth?.userCurrent;
      if (token) {
        config.headers.token = `${token}`;
      }
    }
  }
  return config;
});
//modify data from cybersoft respone data
baseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);


export default baseAPI;
