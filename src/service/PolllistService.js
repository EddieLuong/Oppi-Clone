import { API_POLL } from "../constants/api";
import baseService from "./BaseService";

export function fetchDataPolllist(query) {
  return baseService.get(
    `${API_POLL}?offset=${query}&limit=10&direction=desc&search=`
  );
}

export function deletePollRequest(pollId) {
  return baseService.delete(`${API_POLL}/${pollId}`);
}
