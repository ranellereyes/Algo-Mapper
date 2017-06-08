import React from 'react';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="index-main">
        <main className="comp-main">
          <section className="comp-main">
            <ul className="comp-visualization">
              <li>
                <select>
                  <option value="dijkstra">Dijkstra</option>
                  <option value="astar">A* Algorithm</option>
                  <option value="bellman-ford">Bellman-Ford</option>
                  <option value="floyd-warshall">Floyd-Warshall</option>
                </select>
                <div className="comp-visualization" />
              </li>
              <li>
                <select>
                  <option value="dijkstra">Dijkstra</option>
                  <option value="astar">A* Algorithm</option>
                  <option value="bellman-ford">Bellman-Ford</option>
                  <option value="floyd-warshall">Floyd-Warshall</option>
                </select>
                <div className="comp-visualization" />
              </li>
            </ul>
          </section>
          <section className="comp-arrows">
            <figure></figure>
            <figure></figure>
          </section>
          <section className="comp-graph">
            <ul>
              <li className="comp-graph-code">
                <h3>// Code area //
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h3>
              </li>
              <li className="comp-graph">
                Graph area
              </li>
              <li className="comp-graph-code">
                <h3>
                  // Code area //
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h3>
              </li>
            </ul>
          </section>

        </main>
      </div>
    );
  }
}

export default Comparison;
