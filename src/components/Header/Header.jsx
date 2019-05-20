import React from "react";
import "./styles.scss";

import { Link } from "react-router-dom";
import SpinnerContainer from "../../containers/SpinnerContainer";
import Login from "../../containers/LoginContainer";

const Header = props => (
    <header className="header">
        <nav>
            <div>
                <Link to="/issues" className="header__navlink">
                    Issues
                </Link>
                <Link to="/board" className="header__navlink">
                    Board
                </Link>
                <Login authService={props.auth} />
            </div>
        </nav>
        <SpinnerContainer />
    </header>
);

export default Header;
