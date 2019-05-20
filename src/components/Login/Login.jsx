import React, { Component } from "react";

class Login extends Component {
    login() {
        this.props.startAuth();
        this.props.authService.login();
    }

    logout() {
        this.props.authService.logout();
    }

    componentDidMount() {
        const { renewSession } = this.props.authService;

        if (localStorage.getItem("isLoggedIn") === "true") {
            this.props.startAuth();
            renewSession(() => this.props.successAuth());
        }
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            <span>
                {!isAuthenticated && (
                    <div className="header__navlink" onClick={() => this.login()}>
                        Log In
                    </div>
                )}
                {isAuthenticated && (
                    <div className="header__navlink" onClick={() => this.logout()}>
                        Log Out
                    </div>
                )}
            </span>
        );
    }
}

export default Login;
