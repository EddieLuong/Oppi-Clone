import { API_SIGNIN } from "../constants/api";
import baseService from "./BaseService";

export function login(data) {
  return baseService.post(API_SIGNIN, data);
}
