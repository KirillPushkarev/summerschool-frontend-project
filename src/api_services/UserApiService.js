import axios from "axios";

export default class UserApiService {
    constructor(baseUrl, auth) {
        this.baseUrl = baseUrl;
        this.auth = auth;
    }

    getHeaders() {
        const { getAccessToken } = this.auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        return headers;
    }

    getUsers() {
        return axios.get(`${this.baseUrl}/users`, { headers: this.getHeaders() });
    }
}
