import React, { Component } from "react";
import "./styles.scss";

import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
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
  }
}

export default Header;
