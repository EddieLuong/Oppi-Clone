import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPolllistData } from "../../components/Utils";
import { API_POLL } from "../../constants/api";
import intercept from "../../axios/interceptors";

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
  },
});

export const { setPageCount, setDataPolllistTable, setPollId, setQuery } =
  slice.actions;

export const fetchDataPolllist = () => (dispatch, getState) => {
  let query = getState().polllist.query;
  intercept();
  axios
    .get(`${API_POLL}?offset=${query}&limit=10&direction=desc&search=`)
    .then((respon) => {
      getPolllistData(respon.data.list).then((rows) => {
        dispatch(setDataPolllistTable(rows));
      });
      let totalPage = respon.data.totalCount;
      if (totalPage % 10 === 0) {
        dispatch(setPageCount(totalPage / 10));
      } else {
        let countPage = (totalPage - (totalPage % 10)) / 10 + 1;
        dispatch(setPageCount(countPage));
      }
    });
};

export const deletePollRequest = () => (dispatch, getState) => {
  let pollId = getState().polllist.pollId;
  intercept();
  axios
    .delete(`${API_POLL}/${pollId}`)
    .then((respon) => {
      if (respon.status === 200) {
        console.log("Delete success");
      }
    })
    .catch((err) => console.log(err));
};
export default slice.reducer;
