import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  dataPoll: {},
};

export const slice = createSlice({
  name: "polldetail",
  initialState,
  reducers: {
    setDataPoll(state, action) {
      state.dataPoll = action.payload;
    },
    fetchDataPollAction(state, action) {},
    updatePollAction(state, action) {},
  },
});

export const { setDataPoll, fetchDataPollAction, updatePollAction } =
  slice.actions;


export default slice.reducer;
