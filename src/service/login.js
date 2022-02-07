import { API_SIGNIN } from "../constants/api";
import axios from "axios";

export function login(data) {
  return axios.post(API_SIGNIN, data);
}
