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
            <li>Home</li>
          </ul>
          <ul>
            <li>About us</li>
            <li>Algorithms</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
