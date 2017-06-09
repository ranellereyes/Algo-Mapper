import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../node/node';
import DijkstraSteps from '../../node/dijkstra_steps';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    let visual = new Visualization(NODELIST);
    visual.draw();
    window.v = visual;
    this.setState({ graph: visual });
    this.visual = new DijkstraSteps(NODELIST, 1, 6, visual);
  }

  render() {
    return (
      <div className="index">
        <main className="show">
          <section className="show">
            <h1 className="name">A* Algorithm</h1>
            <ul className="visualization">
              <div className="visualization" />
              <aside className="code"></aside>
            </ul>
          </section>
        </main>
        <section className="algo-bottom">
          <h1>Description</h1>
          <ul className="algo-description">
            <div className="how-it-works">
              <h3>How it Works</h3>
              <p>asdfaf</p>
              <h3>Math</h3>
              <p>asdfasdf</p>
            </div>
            <aside className="pros-n-cons">
              <h3>Pros & Cons</h3>
              <p>asdf</p>
            </aside>
          </ul>
        </section>
      </div>
    )
  }
}

export default Show;
