import React from "react";
import "./styles.scss";

import { Link } from "react-router-dom";

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
    </header>
);

export default Header;
