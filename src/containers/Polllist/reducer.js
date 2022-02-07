import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPolllistData } from "../../components/Utils";
import { API_POLL } from "../../constants/api";
import intercept from "../../axios/interceptors";
import { REQUEST_STATUS } from "../../constants/status";

const initialState = {
  query: 0,
  dataPolllistTable: [],
  pollId: 0,
  pageCount: 0,
};

export const slice = createSlice({
  name: "polllist",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setDataPolllistTable(state, action) {
      state.dataPolllistTable = action.payload;
    },
    setPollId(state, action) {
      state.pollId = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    fetchPolllistRequest() {},
    deletePollAction() {},
  },
});

export const {
  setPageCount,
  setDataPolllistTable,
  setPollId,
  setQuery,
  fetchPolllistRequest,
  deletePollAction,
  deletePollSuccess,
} = slice.actions;

// export const deletePollRequest = () => (dispatch, getState) => {
//   let pollId = getState().polllist.pollId;
//   intercept();
//   axios
//     .delete(`${API_POLL}/${pollId}`)
//     .then((respon) => {
//       if (respon.status === 200) {
//         console.log("Delete success");
//       }
//     })
//     .catch((err) => console.log(err));
// };
export default slice.reducer;
