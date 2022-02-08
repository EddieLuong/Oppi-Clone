import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  fetchPolllistRequest,
  deletePollAction,
  setDataPolllistTable,
  setPageCount,
} from "./reducer";
import {
  fetchDataPolllist,
  deletePollRequest,
} from "../../service/PolllistService";
import { STATUS_CODE } from "../../constants/status";
import { getPolllistData } from "../../components/Utils";

function* fetchData() {
  const query = yield select((state) => state.polllist.query);
  try {
    const response = yield call(fetchDataPolllist, query);
    if (response.status === STATUS_CODE.SUCCESS) {
      const rows = yield call(getPolllistData, response.data.list);
      yield put(setDataPolllistTable(rows));

      const totalPage = response.data.totalCount;
      if (totalPage % 10 === 0) {
        yield put(setPageCount(totalPage / 10));
      } else {
        let pageCount = (totalPage - (totalPage % 10)) / 10 + 1;
        yield put(setPageCount(pageCount));
      }
    }
  } catch (error) {}
}

function* deletePoll() {
  const pollId = yield select((state) => state.polllist.pollId);

  const response = yield call(deletePollRequest, pollId);
  if (response.status === STATUS_CODE.SUCCESS) {
    console.log(`Delete poll have poll id ${pollId} successfully`);
    yield put(fetchPolllistRequest());
  }
}

export default function* polllistSaga() {
  yield takeEvery(fetchPolllistRequest, fetchData);
  yield takeEvery(deletePollAction, deletePoll);
}
