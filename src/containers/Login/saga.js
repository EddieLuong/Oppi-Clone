import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  setErrorMessage,
} from "./reducer";
import { login } from "../../service/login";
import { STATUS_CODE } from "../../constants/status";

const invalidMessage = "Email or password is invalid, please try again.";

function* sendSignInRequest(data) {
  try {
    const response = yield call(login, data.payload);
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put(setErrorMessage(""));
      yield put(loginSuccess(response.data));
    }
  } catch (error) {
    if ((error.response.data.message = "Incorrect username or password")) {
      yield put(loginFail(invalidMessage));
    } else yield put(setErrorMessage(""));
  }
}

export default function* loginSaga() {
  yield takeEvery(loginRequest, sendSignInRequest);
}
