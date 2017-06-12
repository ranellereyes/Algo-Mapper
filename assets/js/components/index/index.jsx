import React from 'react';
import Highlight from 'react-highlight';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../algorithms/node';
import AstarSteps from '../../algorithms/astar_step';
import { AstarDescription, DijkstraDescription, BellmanFordDescription, FloydWarshallDescription } from './descriptions';

const MESSAGES = {
  first: <AstarDescription />,
  second: <DijkstraDescription />,
  third: <BellmanFordDescription />,
  fourth: <FloydWarshallDescription />
};

import FloydWarshallSteps from '../../algorithms/floyd_warshall_steps';
import DijkstraSteps from '../../algorithms/dijkstra_steps';
import BellmanFordSteps from '../../algorithms/bellman_ford_steps';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: 'first',
      active: '',
      message: MESSAGES['first']
    };
    this.selectAlgo = this.selectAlgo.bind(this);
  }

  componentDidMount() {
    let astar = new Visualization(NODELIST, 'astar', 1.85);
    let dijkstra = new Visualization(NODELIST, 'dijkstra', 1.85);
    let bellman = new Visualization(NODELIST, 'bellman', 1.85);
    let floyd = new Visualization(NODELIST, 'floyd', 1.85);
    astar.draw();
    dijkstra.draw();
    bellman.draw();
    floyd.draw();
    this.astar = new AstarSteps(NODELIST, 1, 6, astar).display();
    this.dijkstra = new DijkstraSteps(NODELIST, 1, 6, dijkstra).display();
    this.bellman = new BellmanFordSteps(NODELIST, 1, 6, bellman).display();
    this.floyd = new FloydWarshallSteps(NODELIST, 1, 6, floyd).display();
  }

  componentWillUnmount() {
    clearInterval(this.astar);
    clearInterval(this.dijkstra);
    clearInterval(this.bellman);
    clearInterval(this.floyd);
  }

  selectAlgo(id) {
    this.setState({ algo: id, active: 'into-the-abyss'});
    setTimeout(() => this.setState({
      active: '',
      message: MESSAGES[id]
    }), 200);
  }

  render() {
    return (
      <div className="index-main">
        <main className="index-main">
          <div className="index-content">
            <h1>AlgoMapper</h1>
            <span>Visualize and compare shortest-path algorithms with ease</span>
          </div>
        </main>
        <section className="index-algo-display">
          <ul className="index-algo-list">
            <div tabIndex="1" onFocus={() => this.selectAlgo('first')} className="index-algo-image astar">
              <h2>A* star</h2>
            </div>
            <div tabIndex="1" onFocus={() => this.selectAlgo('second')} className="index-algo-image dijkstra">
              <h2>Dijkstra's</h2>
            </div>
            <div tabIndex="1" onFocus={() => this.selectAlgo('third')} className="index-algo-image bellman">
              <h2>Bellman-Ford</h2>
            </div>
            <div tabIndex="1" onFocus={() => this.selectAlgo('fourth')} className="index-algo-image floyd">
              <h2>Floyd-Warshall</h2>
            </div>
          </ul>
          <div className={`index-arrow-up ${this.state.algo}`}>
            <div className="index-arrow-fill" />
          </div>
          <div className="index-algo-description">
            <section ref="description" className={this.state.active}>
              {this.state.message}
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default Index;
