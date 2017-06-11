import React from 'react';
import Highlight from 'react-highlight';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../algorithms/node';
import AstarSteps from '../../algorithms/astar_step';

const MESSAGES = {
  first: 'EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.',
  second: 'I LOVE FOOD',
  third: 'PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME ',
  fourth: 'howdy there, nice to meet you'
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: 'first',
      active: '',
      message: MESSAGES['first']
    }
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
    this.dijkstra = new AstarSteps(NODELIST, 1, 6, dijkstra).display();
    this.bellman = new AstarSteps(NODELIST, 1, 6, bellman).display();
    this.floyd = new AstarSteps(NODELIST, 1, 6, floyd).display();
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
          <img src='http://i1096.photobucket.com/albums/g327/winber1/header2.png'></img>
          <div className="index-content">
            <h1>AlgoMapper</h1>
            <span>Visualize and compare shortest-path algorithms with ease</span>
          </div>
        </main>
        <section className="index-algo-display">
          <ul className="index-algo-list">
            <div tabIndex="1" onFocus={() => this.selectAlgo('first')} className="index-algo-image astar" />
            <div tabIndex="1" onFocus={() => this.selectAlgo('second')} className="index-algo-image dijkstra" />
            <div tabIndex="1" onFocus={() => this.selectAlgo('third')} className="index-algo-image bellman" />
            <div tabIndex="1" onFocus={() => this.selectAlgo('fourth')} className="index-algo-image floyd" />
          </ul>
          <div className={`index-arrow-up ${this.state.algo}`}>
            <div className="index-arrow-fill" />
          </div>
          <div className="index-algo-description">
            <h3 ref="description" className={this.state.active}>
              {this.state.message}
            </h3>
          </div>
        </section>
        <footer>
          <ul className="author-info">
            <li>
              <figure className="github"></figure>
              <figure className="linkedin"></figure>
              <span>Ranelle Reyes</span>
            </li>
            <li>
              <figure className="github"></figure>
              <figure className="linkedin"></figure>
              <span>Winber Xu</span>
            </li>
            <li>
              <figure className="github"></figure>
              <figure className="linkedin"></figure>
              <span>Janice Yura Lee</span>
            </li>
            <li>
              <figure className="github"></figure>
              <figure className="linkedin"></figure>
              <span>Brandon Chui</span>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
}

export default Index;
