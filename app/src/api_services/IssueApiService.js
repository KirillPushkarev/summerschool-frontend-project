import axios from 'axios';

export default class IssueApiService {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    getIssues() {
        return axios.get(`${this.baseUrl}/issues`);
    }

    getIssue(id) {
        return axios.get(`${this.baseUrl}/issues/${id}`);
    }

    postIssue(issue) {
        return axios.post(`${this.baseUrl}/issues`, issue);
    }

    putIssue(issue) {
        return axios.put(`${this.baseUrl}/issues/${issue.id}`, issue);
    }

    deleteIssue(issue) {
        return axios.delete(`${this.baseUrl}/issues/${issue.id}`);
    }
}