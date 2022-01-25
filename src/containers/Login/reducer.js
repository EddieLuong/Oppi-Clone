import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiSignIn } from "../../components/Utils";
import { history } from "../../App";

const initialState = {
  errorMessage: "",
  status: null,
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

// export const sendSignInRequest = createAsyncThunk(
//   "login/sendSignInRequest",
//   async () => {
//     return {
//       axios
//           .post(AipSignIn, data)
//     }
//   }
// );

export const sendSignInRequest = (data) => (dispatch) => {
  axios
    .post(ApiSignIn, data)
    .then((res) => {
      if (res.status === 200) {
        dispatch(setErrorMessage(""));
        sessionStorage.setItem("AdminAccessToken", res.data.token);
        history.push("/polllist");
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
