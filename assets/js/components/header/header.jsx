import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="nav-header">
        <nav className="nav-bar">
          <ul>
            <li className="nav-logo">
              <Link to="/">AlgoMapper</Link>
              <div className="nav-logo-underline" />
            </li>
          </ul>
          <ul className="nav-menu">
            <li>
              <a>About us</a>
            </li>
            <li>
              <a>Algorithms</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
