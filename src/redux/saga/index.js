import { all } from "redux-saga/effects";
import loginSaga from "../../containers/Login/saga";
import polllistSaga from "../../containers/Polllist/saga";
import pollDetailSaga from "../../containers/PollDetail/saga";

export default function* rootSaga() {
  yield all([loginSaga(), polllistSaga(), pollDetailSaga()]);
}
