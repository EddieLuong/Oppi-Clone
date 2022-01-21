import { createSlice,na } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiSignIn } from "../../components/Utils";

const initialState = {
  errorMessage: "",
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

export const sendSignInRequest = (data) => async (dispatch) => {
  axios
    .post(ApiSignIn, data)
    .then((res) => {
      if (res.status === 200) {
        dispatch(setErrorMessage(""));
        sessionStorage.setItem("AdminAccessToken", res.data.token);
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