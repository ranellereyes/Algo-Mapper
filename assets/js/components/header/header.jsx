import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: ''};
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  toggleDropdown() {
    if (this.state.active === 'active') {
      this.setState({ active: '' });
    } else {
      this.setState({ active: 'active'});
    }
  }

  closeDropdown(e) {
    setTimeout(() => this.setState({ active: ''}), 200);
  }

  render() {
    return (
      <header className="nav-header">
        <nav className="nav-bar">
          <ul className="nav-logo">
            <li>
              <Link to="/">
                <figure className="nav-logo"></figure>
              </Link>
            </li>
            <li className="nav-logo">
              <Link to="/">AlgoMapper
              <div className="nav-logo-underline" />
              </Link>
            </li>
          </ul>
          <ul className="nav-menu">
            <li>
              <Link to="/comparison">Compare</Link>
            </li>
            <li>
              <a
                tabIndex="1"
                onBlur={this.closeDropdown}
                onClick={this.toggleDropdown}
              >Algorithms</a>
            <ul className={`dropdown ${this.state.active}`}>
                <Link className="dropdown" to="/astar">A* (A star)</Link>
                <Link className="dropdown" to="/dijkstras">Dijkstra's</Link>
                <Link className="dropdown" to="/bellman-ford">Bellman-Ford</Link>
                <Link className="dropdown" to="/floyd-warshall">Floyd-Warshall</Link>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
