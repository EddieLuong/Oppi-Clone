import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_SIGNIN } from "../../constants/api";
import { ADMIN_TOKEN } from "../../constants/localStorage";

const initialState = {
  errorMessage: "",
};

export const sendSignInRequest = createAsyncThunk(
  "login/sendSignInRequest",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_SIGNIN, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: {
    [sendSignInRequest.rejected]: (state, { payload }) => {
      if (payload === "Incorrect username or password") {
        state.errorMessage = "Email or password is invalid, please try again.";
      } else state.errorMessage = "";
    },
    [sendSignInRequest.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.errorMessage = "";
        sessionStorage.setItem(ADMIN_TOKEN, payload.data.token);
      }
    },
  },
});

export const { setErrorMessage } = slice.actions;

export default slice.reducer;
