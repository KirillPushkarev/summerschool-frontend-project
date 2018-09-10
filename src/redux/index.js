import { combineReducers } from "redux";
import { issueReducer } from "./issues";
import { userReducer } from "./users";

export default combineReducers({ issues: issueReducer, users: userReducer });
