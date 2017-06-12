import React from 'react';
import Visualization from '../../d3/visualization';

import Highlight from 'react-highlight';
import { NODELIST2 } from '../../algorithms/node';

import BellmanFordSteps from '../../algorithms/bellman_ford_steps';

class ShowBellmanFord extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
    this.fetchCode = this.fetchCode.bind(this);
    // this. = this..bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;
    let visual = new Visualization(NODELIST2, "visualization");
    visual.draw();
    this.setState({ graph: visual});
    this.algorithm = new BellmanFordSteps(NODELIST2, 1, 8, visual);
    this.fetchCode('static/javascript/bellman_ford.js');
  }

  componentWillUnmount() {
    document.onkeydown = null;
    document.onkeyup = null;
  }

  fetchCode(file) {
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = () => {
      if(f.readyState === 4) {
        if(f.status === 200 || f.status == 0) {
          this.code = f.responseText;
        }
      }
    };
    f.send(null);
  }

  handleKeyPress (e) {
    if (e.keyCode === 37){
      this.algorithm.stepBackward();
      document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    } else if (e.keyCode === 39){
      this.algorithm.stepForward();
      document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    }
  }
  handleKeyUp (e) {
    document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_gray.png')";
    document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_gray.png')";
  }

  handleClickLeft(e) {
    // this.handleKeyPress({keyCode:  37});
    this.algorithm.stepBackward();
  }

  handleClickRight(e) {
    // this.handleKeyPress({keyCode:  39});
    this.algorithm.stepForward();
  }

  render() {
    return (
      <div className="index-main">
        <main className="show-main">
          <section className="show-main">
            <h1 className="show-name">Bellman Ford Algorithm</h1>
            <ul className="visualization">
              <div className="visualization" />
              <aside className="show-code">
                  <Highlight class="javascript-snippet">
                    {this.code}
                  </Highlight>
              </aside>
              <figure onClick={this.handleClickLeft} id="arrow_left"></figure>
              <figure onClick={this.handleClickRight} id="arrow_right"></figure>
            </ul>
          </section>
        </main>
        <section className="show-algo-bottom">
          <div>
            <h1>Description</h1>
            <ul className="show-algo-description">
              <div className="show-how-it-works">
                <h3>How it Works</h3>
                <p>
                  The Bellman-Ford algorithm is an algorithm that finds the <code>cost</code> (shortest path) from a source node to a destination node or all other nodes within a graph. Unlike Dijkstra's algorithm, the Bellman-Ford algorithm can handle negative edge weights and will display an error if there is a negative cycle. Edge weights are numerical values that represent the <code>cost</code> of getting from one node to another connecting node.
                </p>
                <ol>
                  <li><span>Assign a source node and set its <code>cost</code> to 0. Set all other nodes' <code>cost</code> to infinity because the source node does not know how much it will <code>cost</code> to get to the other nodes.</span></li>
                  <li><span>From the source node it relaxes all the edges in the graph that are outgoing from the source node.</span></li>
                  <li><span>Iterate through every node V-1 times (V = # of vertices/nodes) and updates the <code>cost</code> of getting from the source node to every other node if the <code>cost</code> is less than the previous <code>cost</code> of getting to the node.</span></li>
                  <ul className='how-it-works'>
                    <li><span><code> cost[edge.toId] = cost[edge.fromId] + edge.weight</code></span></li>
                    <li><span><code>cost[edge.toId]</code> is the cost of the parent node to reach its child node</span></li>
                    <li><span><code>Node 1</code> (<code>currentNode</code>) has a cost of 0 and the <code>weight</code> to get to <code>Node 2</code> is 3.</span></li>
                    <li><span>The <code>cost[edge.toId]</code> from <code>Node 1</code> to <code>Node 2</code> is 0 + 3 = 3 which is less than Node 2's current <code>cost</code> of infinity.</span></li>
                    <li><span>The new <code>cost[edge.toId]</code> of getting from <code>Node 1</code> to <code>Node 2</code> is now 3.</span></li>
                  </ul>
                  <li><span>The algorithm ends when it iterates over the nodes V-1 times or if the current and previous iteration is the same.</span></li>
                </ol>
                <h3>Details</h3>
                <p>
                  The Bellman-Ford algorithm can account for negative weight edges because the algorithm will iterate through all the edge weights every iteration to update the <code>cost</code> to reach the adjacent nodes. Because of these iterations, the time complexity of the Bellman-Ford algorithm at worst runs at O((V-1) * E) time complexity (O(n<sup>2</sup>)) where V is the number of nodes and E is the number of edges and at best O(n) if each node only has one child node.
                </p>
              </div>
              <aside className="show-pros-n-cons">
                <h3>Pros</h3>
                  <ul className='pros-n-cons'>
                    <li><span>Accounts for negative weights when finding the shortest path</span></li>
                    <li><span>Determines if negative-weight cycles exist</span></li>
                    <li><span>Allows for a wider class of inputs than Dijkstra's algorithm</span></li>
                  </ul>
                  <h3>Cons</h3>
                  <ul className='pros-n-cons'>
                    <li><span>Slower than Dijkstra's Algorithm</span></li>
                    <li><span>Shortest path won't be found with negative weight cycles</span></li>
                  </ul>
              </aside>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default ShowBellmanFord;
