import { courseReducer } from "./courseReducer";
import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducers = combineReducers({
  courses: courseReducer,
  users: userReducer,
});

export default rootReducers;
