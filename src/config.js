export default {
    baseURL: "/api",
    auth0config: {
        domain: "issue-tracker-999.auth0.com",
        clientID: "e1SrwwZ5MubIChPhCv9KjtZltnqBOg0R",
        redirectUri:
            process.env.NODE_ENV === "production"
                ? "https://issue-tracker-999.herokuapp.com/callback"
                : "http://localhost:3000/callback",
        responseType: "token id_token",
        scope: "openid",
        audience: "https://issue-tracker-999.herokuapp.com",
    },
};
