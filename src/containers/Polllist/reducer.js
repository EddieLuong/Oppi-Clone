import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deletePoll, getPolllistData } from "../../components/Utils";

const initialState = {
  query: 0,
  dataPolllistTable: [],
  pollId: 0,
  pageCount: 0,
  sameQuery: false,
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
    setSameQuery(state) {
      state.sameQuery = !state.sameQuery;
    },
    setCountPage(state, action) {
      state.pageCount = action.payload;
    },
  },
});

export const {
  setCountPage,
  setDataPolllistTable,
  setPollId,
  setSameQuery,
  setQuery,
} = slice.actions;

export const fetchDataPolllist =
  (accessToken) => async (dispatch, getState) => {
    let query = getState().polllist.query;
    axios
      .get(
        `https://dev.oppi.live/api/admin/v1/polls?offset=${query}&limit=10&direction=desc&search=`,
        {
          headers: {
            Authorization: `Bearer  ${accessToken}`,
          },
        }
      )
      .then((respon) => {
        getPolllistData(respon.data.list).then((rows) => {
          dispatch(setDataPolllistTable(rows));
        });
        let totalPage = respon.data.totalCount;
        if (totalPage % 10 === 0) {
          dispatch(setCountPage(totalPage / 10));
        } else {
          let countPage = (totalPage - (totalPage % 10)) / 10 + 1;
          dispatch(setCountPage(countPage));
        }
      });
  };

export const deletePollRequest =
  (accessToken) => async (dispatch, getState) => {
    let idPollDelete = getState().polllist.pollId;
    axios
      .delete(`${deletePoll}/${idPollDelete}`, {
        headers: {
          Authorization: `Bearer  ${accessToken}`,
        },
      })
      .then((respon) => {
        if (respon.status === 200) {
          dispatch(setSameQuery());
          console.log("Delete success");
        }
      })
      .catch((err) => console.log(err));
  };
export default slice.reducer;
