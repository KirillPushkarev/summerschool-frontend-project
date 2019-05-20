import auth0 from "auth0-js";
import history from "../history";

export default class AuthService {
    auth0;
    accessToken;
    idToken;
    expiresAt;

    constructor(auth0config) {
        this.auth0 = new auth0.WebAuth(auth0config);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        this.renewSession = this.renewSession.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication(onSuccess, onFailure) {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                onSuccess();
            } else if (err) {
                history.replace("/");
                onFailure();
            }
        });
    }

    getAccessToken() {
        return this.accessToken;
    }

    getIdToken() {
        return this.idToken;
    }

    setSession(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem("isLoggedIn", "true");

        // Set the time that the Access Token will expire at
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        // navigate to the home route
        history.replace("/");
    }

    renewSession(onSuccess, onFailure) {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                onSuccess();
            } else if (err) {
                this.logout();
                onFailure();
            }
        });
    }

    logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem("isLoggedIn");

        this.auth0.logout({
            returnTo: window.location.origin,
        });

        // navigate to the home route
        history.replace("/");
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
    }
}
