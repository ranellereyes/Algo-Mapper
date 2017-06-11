import React from 'react';
import Graph from '../../d3/graph';
import Highlight from 'react-highlight';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../algorithms/node';

import DijkstraSteps from '../../algorithms/dijkstra_steps';
import AstarSteps from '../../algorithms/astar_step';
import BellmanFordSteps from '../../algorithms/bellman_ford_steps';
import FloydWarshallSteps from '../../algorithms/floyd_warshall_steps';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options:
                    { optionA: "dijkstra",
                      optionB: "bellman-ford"
                    },
                  algorithms: {}
                  };
    // this.visual = [];
    this.codes = [];

    this.resetAlgorithms = this.resetAlgorithms.bind(this);
    this.fetchCode = this.fetchCode.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
    this.handleSelectA = this.handleSelectA.bind(this);
    this.handleSelectB = this.handleSelectB.bind(this);

  }

  componentDidMount() {

    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;

    // window.v = visualA;
    // this.setState({ graph: this.visualA});
    this.visual = [];

    this.visual.push(new Visualization(NODELIST, "comp-visualization-a"));
    this.visual.push(new Visualization(NODELIST, "comp-visualization-b"));
    this.visual[0].draw();
    this.visual[1].draw();
    let graph = new Graph();
    graph.draw();

    this.resetAlgorithms();

  }

  componentWillUnmount() {
    document.onkeydown = null;
    document.onkeyup = null;
  }

  resetAlgorithms() {

    let algorithms = [];
    d3.selectAll("svg").remove();
    this.visual = [];
    this.codes = [];

    this.visual.push(new Visualization(NODELIST, "comp-visualization-a"));
    this.visual.push(new Visualization(NODELIST, "comp-visualization-b"));
    this.visual[0].draw();
    this.visual[1].draw();

    new Graph().draw();

    Object.keys(this.state.options).forEach((key, index) => {
      switch (this.state.options[key]) {
        case "dijkstra":
          algorithms.push(new DijkstraSteps(NODELIST, 1, 6, this.visual[index]));
          this.fetchCode('static/javascript/dijkstra.js');
          break;
        case "astar":
          algorithms.push(new AstarSteps(NODELIST, 1, 6, this.visual[index]));
          this.fetchCode('static/javascript/astar.js');
          break;
        case "bellman-ford":
          algorithms.push(new BellmanFordSteps(NODELIST, 1, 6, this.visual[index]));
          this.fetchCode('static/javascript/bellman_ford.js');
          break;
        case "floyd-warshall":
          algorithms.push(new FloydWarshallSteps(NODELIST, 1, 6, this.visual[index]));
          this.fetchCode('static/javascript/floyd_warshall.js');
      }
    });
    this.setState({algorithms: algorithms});
  }

  fetchCode(file) {
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = () => {
      if(f.readyState === 4) {
        if(f.status === 200 || f.status == 0) {
          this.codes.push(f.responseText);
        }
      }
    };
    f.send(null);
  }

  handleKeyPress (e) {
    if (e.keyCode === 37){
      this.handleClickLeft(e);
      document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    } else if (e.keyCode === 39){
      this.handleClickRight(e);
      document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    }
  }
  handleKeyUp (e) {
    document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_gray.png')";
    document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_gray.png')";
  }

  handleClickLeft(e) {
    this.state.algorithms.forEach((algo) => {
      algo.stepBackward();
    });
  }

  handleClickRight(e) {
    this.state.algorithms.forEach((algo) => {
      algo.stepForward();
    });
  }

  handleSelectA (e) {
    this.state.options.optionA = e.target.value;
    this.resetAlgorithms();
  }

  handleSelectB (e) {
    this.state.options.optionB = e.target.value;
    this.resetAlgorithms();

  }

  render() {
    return (
      <div className="index-main">
        <main className="comp-main">
          <section className="comp-main">
            <ul className="comp-visualization">
              <li>
                <select onChange={this.handleSelectA} value={this.state.options.optionA}>
                  <option value="dijkstra">Dijkstra</option>
                  <option value="astar">A* Algorithm</option>
                  <option value="bellman-ford">Bellman-Ford</option>
                  <option value="floyd-warshall">Floyd-Warshall</option>
                </select>

                <div className="comp-visualization-a" />
              </li>
              <li>
                <select onChange={this.handleSelectB} value={this.state.options.optionB}>
                  <option value="dijkstra">Dijkstra</option>
                  <option value="astar">A* Algorithm</option>
                  <option value="bellman-ford">Bellman-Ford</option>
                  <option value="floyd-warshall">Floyd-Warshall</option>
                </select>
                <div className="comp-visualization-b" />
              </li>
            </ul>
          </section>
          <section className="comp-arrows">
            <figure onClick={this.handleClickLeft} id="arrow_left"></figure>
            <figure onClick={this.handleClickRight} id="arrow_right"></figure>
          </section>
          <section className="comp-graph">
            <ul>
              <li className="comp-graph-code">
                <Highlight class="javascript-snippet">
                  {this.codes[0]}
                </Highlight>
              </li>
              <div className="comp-graph">
              </div>
              <li className="comp-graph-code">
                <Highlight class="javascript-snippet">
                  {this.codes[1]}
                </Highlight>
              </li>
            </ul>
          </section>

        </main>
      </div>
    );
  }
}

export default Comparison;
