import axios from "axios";
import { API_POLL } from "../constants/api";

export function fetchDataPolllist(query) {
  return axios.get(
    `${API_POLL}?offset=${query}&limit=10&direction=desc&search=`
  );
}

export function deletePollRequest(pollId) {
  return axios.delete(`${API_POLL}/${pollId}`);
}
