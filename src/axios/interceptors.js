import axios from "axios";
import { ADMIN_TOKEN } from "../constants/localStorage";

const intercept = () => {
  const accessToken = sessionStorage.getItem(ADMIN_TOKEN);
  axios.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default intercept;
