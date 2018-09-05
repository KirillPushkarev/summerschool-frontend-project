import React from "react";
import "./styles.scss";

import { Link } from "react-router-dom";
import SpinnerContainer from "../../containers/SpinnerContainer";

const Header = () => (
    <header className="header">
        <nav>
            <div>
                <Link to="/issues" className="header__navlink">
                    Issues
                </Link>
                <Link to="/board" className="header__navlink">
                    Board
                </Link>
            </div>
        </nav>
        <SpinnerContainer />
    </header>
);

export default Header;
