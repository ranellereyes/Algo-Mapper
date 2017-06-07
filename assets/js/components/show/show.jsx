import React from 'react';
import AstarVisualization from '../../d3/astar';
import NODELIST from '../../node/node';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = { graph: new AstarVisualization(NODELIST) }
  }

  componentDidMount() {
    this.state.graph.draw();
  }

  render() {
    return (
      <div className="index">
        <main className="show">
          <h1 className="name">A* Algorithm</h1>
          <ul className="visualization">
            <div className="visualization" />
            <aside className="code"></aside>
          </ul>
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
        </main>
      </div>
    )
  }
}

export default Show;
