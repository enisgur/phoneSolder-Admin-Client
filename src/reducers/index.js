import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import quotes from "./quotes";

export default combineReducers({
  alert,
  auth,
  quotes,
});
