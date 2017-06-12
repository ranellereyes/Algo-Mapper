import React from 'react';
import Graph from '../../d3/graph';
import Highlight from 'react-highlight';
import Visualization from '../../d3/visualization';
import { NODELIST2, nodelistGenerator } from '../../algorithms/node';

import DijkstraSteps from '../../algorithms/dijkstra_steps';
import AstarSteps from '../../algorithms/astar_step';
import BellmanFordSteps from '../../algorithms/bellman_ford_steps';
import FloydWarshallSteps from '../../algorithms/floyd_warshall_steps';

import Dijkstra from '../../algorithms/dijkstra';
import Astar from '../../algorithms/astar';
import BellmanFord from '../../algorithms/bellman_ford';
import FloydWarshall from '../../algorithms/floyd_warshall';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options:
                    { optionA: "dijkstra",
                      optionB: "bellman-ford"
                    },
                  algorithms: [],
                  graphAlgo: [],
                  graph: null
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
    this.handlePlayGraph = this.handlePlayGraph.bind(this);

  }

  componentDidMount() {

    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;

    this.visual = [];

    this.visual.push(new Visualization(NODELIST2, "comp-visualization-a"));
    this.visual.push(new Visualization(NODELIST2, "comp-visualization-b"));
    this.visual[0].draw();
    this.visual[1].draw();

    this.resetAlgorithms();
  }

  componentWillUnmount() {
    document.onkeydown = null;
    document.onkeyup = null;
  }

  resetAlgorithms() {

    let algorithms = [];
    let graphAlgo = [];
    this.revealPlayButton();
    d3.selectAll("svg").remove();
    this.visual = [];
    this.codes = [];

    this.visual.push(new Visualization(NODELIST2, "comp-visualization-a"));
    this.visual.push(new Visualization(NODELIST2, "comp-visualization-b"));
    this.visual[0].draw();
    this.visual[1].draw();


    Object.keys(this.state.options).forEach((key, index) => {
      switch (this.state.options[key]) {
        case "dijkstra":
          algorithms.push(new DijkstraSteps(NODELIST2, 1, 8, this.visual[index]));
          graphAlgo.push(Dijkstra);
          this.fetchCode('static/javascript/dijkstras.js');
          break;
        case "astar":
          algorithms.push(new AstarSteps(NODELIST2, 1, 8, this.visual[index]));
          graphAlgo.push(Astar);
          this.fetchCode('static/javascript/astar.js');
          break;
        case "bellman-ford":
          algorithms.push(new BellmanFordSteps(NODELIST2, 1, 8, this.visual[index]));
          graphAlgo.push(BellmanFord);
          this.fetchCode('static/javascript/bellman_ford.js');
          break;
        case "floyd-warshall":
          algorithms.push(new FloydWarshallSteps(NODELIST2, 1, 8, this.visual[index]));
          graphAlgo.push(FloydWarshall);
          this.fetchCode('static/javascript/floyd_warshall.js');
      }
    });

    let graph = new Graph(...graphAlgo);
    graph.drawPlaceholder();
    this.setState({algorithms, graphAlgo, graph});
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

  handleSelectA(e) {
    this.state.options.optionA = e.target.value;
    this.resetAlgorithms();
  }

  handleSelectB(e) {
    this.state.options.optionB = e.target.value;
    this.resetAlgorithms();
  }

  handlePlayGraph(e) {
    d3.selectAll(".graph").remove();
    this.state.graph.draw();
    this.hidePlayButton();
  }

  hidePlayButton(){
    let buttonHolder = document.getElementById("button-holder");
    buttonHolder.style.backgroundColor = "transparent";
    // buttonHolder.style.zIndex = "-1";
    buttonHolder.style.width = "60%";
    buttonHolder.style.height = "80px";
    let button = document.getElementById("button");
    button.removeEventListener("mouseover", this.mouseOverEffect);
    button.removeEventListener("mouseout", this.mouseOutEffect);
    button.style.backgroundImage = "url('../static/images/replay.png')";
    button.style.margin = "105px 0 0 -100px";
    button.style.width = "50px";
    button.style.height = "50px";
    button.style.zIndex = "1";
  }

  revealPlayButton(){
    let buttonHolder = document.getElementById("button-holder");
    buttonHolder.style.backgroundColor = "lightgray";
    buttonHolder.style.width = "100%";
    buttonHolder.style.height = "100%";
    buttonHolder.style.zIndex = "1";
    let button = document.getElementById("button");
    button.style.backgroundImage = "url('../static/images/play_button.png')";
    button.style.margin = "0";
    button.style.width = "40%";
    button.style.height = "40%";
    button.style.zIndex = "1";
    button.addEventListener("mouseover", this.mouseOverEffect);
    button.addEventListener("mouseout", this.mouseOutEffect);
  }

  mouseOverEffect(e) {
    e.target.style.backgroundImage = "url('../static/images/play_button_hover.png')";
  }

  mouseOutEffect(e) {
    e.target.style.backgroundImage = "url('../static/images/play_button.png')";
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
              <li className="comp-graph">
                <div className="comp-graph">
                  <div className="comp-graph-button" id="button-holder">
                    <figure onClick={this.handlePlayGraph} id="button"></figure>
                  </div>
                </div>
              </li>
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
