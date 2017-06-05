import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <nav className="nav-bar">
          <ul>
            <li>
              <a>Home</a>
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
