import { API_POLL } from "../constants/api";
import baseService from "./BaseService";

export function fetchDataPollDetail(id) {
  return baseService.get(`${API_POLL}/${id}`);
}

export function updatePoll({ pollId, dataUpdate }) {
  return baseService.put(`${API_POLL}/${pollId}`, dataUpdate);
}
