import { put, call, takeEvery, select } from "redux-saga/effects";
import intercept from "../../axios/interceptors";
import { fetchDataPollAction, setDataPoll, updatePollAction } from "./reducer";
import { fetchDataPollDetail, updatePoll } from "../../service/pollDetail";
import { STATUS_CODE } from "../../constants/status";

function* fetchPollDetailWorker({ payload }) {
  yield intercept();
  try {
    const response = yield call(fetchDataPollDetail, payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put(setDataPoll(response.data));
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* updatePollWorker(action) {
  console.log(action);
  // yield intercept();
  // const dataPoll = select((state) => state.polldetail.dataPoll);
  // if (payload.title && payload.question && payload.description) {
  //   const dataUpdate = {
  //     ...dataPoll,
  //     name: payload.title.trim(),
  //     question: payload.question.trim(),
  //     description: payload.description.trim(),
  //     // is_turn_on_intergration_setting: true,
  //     // passcode: "2123124",
  //   };
  //   yield call(updatePoll, { id: payload.id, dataUpdate });
  // }
}

export default function* pollDetailSaga() {
  yield takeEvery(fetchDataPollAction, fetchPollDetailWorker);
  yield takeEvery(updatePollAction, updatePollWorker);
}
