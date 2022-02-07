import axios from "axios";
import { API_POLL } from "../constants/api";

export function fetchDataPollDetail(id) {
  return axios.get(`${API_POLL}/${id}`);
}

export function updatePoll({ id, dataUpdate }) {
  return axios.put(`${API_POLL}/${id}`, dataUpdate);
}
