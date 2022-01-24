import { createSlice } from "@reduxjs/toolkit";
import { ApiPollDetail } from "../../components/Utils";
import axios from "axios";

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
  },
});

export const { setDataPoll } = slice.actions;

export const fetchDataPoll = (accessToken) => async (dispatch, getState) => {
  let pollId = getState().polllist.pollId;
  axios
    .get(`${ApiPollDetail}/${pollId}`, {
      headers: {
        Authorization: `Bearer  ${accessToken}`,
      },
    })
    .then((respon) => {
      if (respon.status === 200) {
        setDataPoll(respon.data);
      }
    })
    .catch((e) => console.log(e));
};

export const sendPutRequest = (data, accessToken) => (dispatch, getState) => {
  let pollId = getState().polllist.pollId;
  const dataPoll = getState().polldetail.dataPoll;
  if (data.title && data.question && data.description) {
    const dataSend = {
      ...dataPoll,
      name: data.title.trim(),
      question: data.question.trim(),
      description: data.description.trim(),
      is_turn_on_intergration_setting: true,
      passcode: "2123124",
    };
    axios({
      method: "put",
      url: `https://dev.oppi.live/api/admin/v1/polls/${pollId}`,
      headers: {
        Authorization: `Bearer  ${accessToken}`,
      },
      data: dataSend,
    });
    dispatch(setDataPoll(dataSend));
  }
};

export default slice.reducer;
