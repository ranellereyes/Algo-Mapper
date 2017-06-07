import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <nav className="nav-bar">
          <ul>
            <li className="logo">
              <Link to="/">AlgoMapper</Link>
              <div className="underline" />
            </li>
          </ul>
          <ul>
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
