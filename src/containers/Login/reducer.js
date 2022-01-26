import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../../App";
import { API_SIGNIN } from "../../constants/api";
import { ADMIN_TOKEN } from "../../constants/localStorage";
import clientPath from "../../constants/clientPath";

const initialState = {
  errorMessage: "",
  status: null,
};

// export const sendSignInRequest = createAsyncThunk(
//   "login/sendSignInRequest",
//   async (data) => {
//     return axios
//       .post(API_SIGNIN, data)
//       .then((res) => res)
//       .catch((error) => error);
//   }
// );

export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
  // extraReducers: {
  //   [sendSignInRequest.pending]: (state) => {
  //     state.errorMessage = "Loading...";
  //     state.status = "Loading...";
  //   },
  //   [sendSignInRequest.fulfilled]: (state, { payload }) => {
  //     state.status = "Login success...";
  //     state.errorMessage = "";
  //     sessionStorage.setItem(ADMIN_TOKEN, payload.token);
  //     // history.push(clientPath.POLLLIST);
  //   },
  //   [sendSignInRequest.rejected]: (state, { payload }) => {
  //     state.status = "Login failed...";
  //     console.log("rejected", payload);
  //     if (payload.response.data.message === "Incorrect username or password") {
  //       state.errorMessage = "Email or password is invalid, please try again.";
  //     } else {
  //       state.errorMessage = "";
  //     }
  //   },
  // },
});

export const sendSignInRequest = (data) => (dispatch) => {
  axios
    .post(API_SIGNIN, data)
    .then((res) => {
      if (res.status === 200) {
        dispatch(setErrorMessage(""));
        sessionStorage.setItem(ADMIN_TOKEN, res.data.token);
        history.push(clientPath.POLLLIST);
      }
    })
    .catch((e) => {
      console.log("Fail to Sign In");
      if (e.response.data.message === "Incorrect username or password") {
        dispatch(
          setErrorMessage("Email or password is invalid, please try again.")
        );
      } else {
        dispatch(setErrorMessage(""));
      }
    });
};

export const { setErrorMessage } = slice.actions;

export default slice.reducer;
