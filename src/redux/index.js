import { combineReducers } from "redux";
import { issueReducer } from "./issues";
import { userReducer } from "./users";
import { authReducer } from "./auth";

export default combineReducers({ issues: issueReducer, users: userReducer, auth: authReducer });
