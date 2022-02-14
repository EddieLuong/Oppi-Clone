import { createSlice } from "@reduxjs/toolkit";

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


export default slice.reducer;
