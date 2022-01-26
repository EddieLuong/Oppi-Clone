import { combineReducers } from "redux";
import polllistReducer from "../containers/Polllist/reducer";
import pollDetailReducer from "../containers/PollDetail/reducer";
import loginReducer from "../containers/Login/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  polllist: polllistReducer,
  polldetail: pollDetailReducer,
});

export default rootReducer;
