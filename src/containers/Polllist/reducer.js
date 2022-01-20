import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ApiDelete,
  accessToken,
  getPolllistData,
} from "../../components/Utils";

const initialState = {
  query: 0,
  isDeleteDialogOpen: false,
  dataPolllistTable: {},
  currentPage: 1,
  idPollDelete: 0,
  countPage: 0,
  sameQuery: false,
};

export const slice = createSlice({
  name: "polllist",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    toggleDeleteDialog(state) {
      state.isDeleteDialogOpen = !state.isDeleteDialogOpen;
    },
    setDataPolllistTable(state, action) {
      state.dataPolllistTable = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setIdPollDelete(state, action) {
      state.idPollDelete = action.payload;
    },
    setSameQuery(state) {
      state.sameQuery = !state.sameQuery;
    },
    setCountPage(state, action) {
      state.countPage = action.payload;
    },
  },
});

export const deletePollRequest = () => async (dispatch, getState) => {
  let idPollDelete = getState().polllist.idPollDelete;
  axios
    .delete(`${ApiDelete}/${idPollDelete}`, {
      headers: {
        Authorization: `Bearer  ${accessToken}`,
      },
    })
    .then((respon) => console.log(respon))
    .catch((err) => console.log(err));

  dispatch(polllistActions.setSameQuery());
  // setSameQuery((prev) => !prev);
};

export const polllistActions = slice.actions;
export const fetchDataPolllist = () => async (dispatch, getState) => {
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
        dispatch(polllistActions.setDataPolllistTable(rows));
      });
      let totalPage = respon.data.totalCount;
      if (totalPage % 10 === 0) {
        dispatch(polllistActions.setCountPage(totalPage / 10));
      } else {
        let countPage = (totalPage - (totalPage % 10)) / 10 + 1;
        dispatch(polllistActions.setCountPage(countPage));
      }
    });
};

export default slice.reducer;
