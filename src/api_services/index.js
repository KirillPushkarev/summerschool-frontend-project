import AuthService from "./AuthService";
import IssueService from "./IssueApiService";
import UserService from "./UserApiService";
import config from "../config";

export const authService = new AuthService(config.auth0config);
export const issueService = new IssueService(config.baseURL, authService);
export const userService = new UserService(config.baseURL, authService);
