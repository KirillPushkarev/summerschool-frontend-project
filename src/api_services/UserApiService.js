import axios from "axios";

export default class UserApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getUsers() {
    return axios.get(`${this.baseUrl}/users`);
  }
}
