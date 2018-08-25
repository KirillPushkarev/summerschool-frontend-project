import React, { Component } from 'react';
import './styles.css';

import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
        <header className="header">
          <h1 className="header__title">Issue tracker</h1>
          <Link to="/issues">Issue list</Link>
          <Link to="/board">Board</Link>
        </header>
    );
  }
}

export default Header;