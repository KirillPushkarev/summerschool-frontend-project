import axios from "axios";

export default class IssueApiService {
    constructor(baseUrl, auth) {
        this.baseUrl = baseUrl;
        this.auth = auth;
    }

    getHeaders() {
        const { getAccessToken } = this.auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        return headers;
    }

    getIssues() {
        return axios.get(`${this.baseUrl}/issues`, { headers: this.getHeaders() });
    }

    getIssue(id) {
        return axios.get(`${this.baseUrl}/issues/${id}?_embed=comments`, { headers: this.getHeaders() });
    }

    postIssue(issue) {
        return axios.post(`${this.baseUrl}/issues`, issue, { headers: this.getHeaders() });
    }

    putIssue(issue) {
        return axios.put(`${this.baseUrl}/issues/${issue.id}`, issue, { headers: this.getHeaders() });
    }

    deleteIssue(id) {
        return axios.delete(`${this.baseUrl}/issues/${id}`, { headers: this.getHeaders() });
    }
}
