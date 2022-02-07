import axios from "axios";
import { API_POLL } from "../constants/api";

export function fetchDataPollDetail(id) {
  return axios.get(`${API_POLL}/${id}`);
}

export function updatePoll({ pollId, dataUpdate }) {
  return axios.put(`${API_POLL}/${pollId}`, dataUpdate);
}
