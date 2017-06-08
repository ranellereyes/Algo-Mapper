import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: ''}
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  openDropdown() {
    this.setState({ active: 'active'})
  }

  closeDropdown(e) {
    setTimeout(() => this.setState({ active: ''}), 100);
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
              <a>Compare</a>
            </li>
            <li>
              <a
                tabIndex="1"
                onBlur={this.closeDropdown}
                onClick={this.openDropdown}
              >Algorithms</a>
              <ul className={`dropdown ${this.state.active}`}>
                <Link className="dropdown" to="/astar">A* (A star)</Link>
                <Link className="dropdown" to="/dijkstra">Dijkstra's</Link>
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
