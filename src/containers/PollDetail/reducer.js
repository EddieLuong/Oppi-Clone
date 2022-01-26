import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_POLL } from "../../constants/api";
import intercept from "../../axios/interceptors";

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

export const fetchDataPoll = (id) => (dispatch, getState) => {
  intercept();
  axios
    .get(`${API_POLL}/${id}`)
    .then((respon) => {
      if (respon.status === 200) {
        dispatch(setDataPoll(respon.data));
      }
    })
    .catch((e) => console.log(e));
};

export const sendPutRequest = (data, id) => (dispatch, getState) => {
  intercept();
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
      url: `${API_POLL}/${id}`,
      data: dataSend,
    });
    dispatch(setDataPoll(dataSend));
  }
};

export default slice.reducer;
