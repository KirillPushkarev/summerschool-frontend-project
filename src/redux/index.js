import { combineReducers } from "redux";
import { issueReducer } from "./issues";
import { userReducer } from "./users";

export const rootReducer = combineReducers({ issues: issueReducer, users: userReducer });
