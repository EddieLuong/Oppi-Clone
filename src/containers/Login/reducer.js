import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: " ",
};
export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = slice.actions;

export default slice.reducer;
