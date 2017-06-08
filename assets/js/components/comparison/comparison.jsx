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
        </main>
      </div>
    );
  }
}

export default Comparison;
