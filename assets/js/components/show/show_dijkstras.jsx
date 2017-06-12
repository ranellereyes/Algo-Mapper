import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST2 } from '../../algorithms/node';
import Highlight from 'react-highlight';
import DijkstraSteps from '../../algorithms/dijkstra_steps';

class ShowDijkstras extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;
    let visual = new Visualization(NODELIST2, "visualization");
    visual.draw();
    this.setState({ graph: visual });
    this.algorithm = new DijkstraSteps(NODELIST2, 1, 8, visual);
    this.fetchCode('static/javascript/dijkstras.js');
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

  componentWillUnmount() {
    document.onkeydown = null;
    document.onkeyup = null;
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
            <h1 className="show-name">Dijkstra's Algorithm</h1>
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
                Dijkstra’s (pronounced ‘DYKE-struh’) algorithm is an algorithm that finds the <code>cost</code> (shortest path) from a source node to a destination node or all other nodes within a graph that does not contain negative edge weights. Edge weights are numerical values that represent the <code>cost</code> of getting from one node to another connecting node.</p>
                    <ol>
                      <li><span>Assign a source node and set its <code>cost</code> to 0. Set all other nodes' <code>cost</code> to infinity because the source node does not know how much it will <code>cost</code> to get to the other nodes.</span></li>
                      <li><span>Set source node to current node and mark all nodes as unvisisted.</span></li>
                      <li><span>Find all unvisisted neighbors (children) of current node and calculates the tentative <code>cost</code> to each neighbor by adding the <code>cost</code> of the current node with the edge <code>weight</code> to get to the neighbor. If the tentative <code>cost</code> to the neighbor is less than the neighbor's current <code>cost</code>, set the neighbo's <code>cost</code> to the tentative <code>cost</code>.</span></li>
                        <ul className='how-it-works'>
                        	<li><span><code>neighbor.cost = currentNode.cost + child.weight</code></span></li>
                        	<li><span><code>neighbor.cost</code> is the cost of the <code>currentNode</code> to reach its neighbor</span></li>
                        	<li><span><code>Node 1</code> (<code>currentNode</code>) has a cost of 0 and the <code>weight</code> to get to <code>Node 2</code> is 3.</span></li>
                        	<li><span>The tentative <code>cost</code> from <code>Node 1</code> to <code>Node 2</code> is 0 + 3 = 3 which is less than Node 2's current <code>cost</code> of infinity.</span></li>
                          <li><span>The new <code>cost</code> of getting from <code>Node 1</code> to <code>Node 2</code> is now 3.</span></li>
                        </ul>
                      <li><span>After the current node checks all of its unvisited neighbors, mark the current node as <code>visited</code>. <code>Visited</code> nodes will never be checked again.</span></li>
                      <li><span>If all nodes have been <code>visited</code> or the destination node has been <code>visited</code>, the algorithm is finished. Otherwise, the current node is set to the node with the lowest <code>cost</code> and return back to step 3.</span></li>
                  </ol>
                <h3>Details</h3>
                <p>
                  Dijkstra’s algorithm does not purposely direct it’s patting towards the destination node. Instead, it finds the shortest path to every node in the graph, and if the destination node is reached, the algorithm stops. To find the shortest path of the source node to the destination node, simply trace the way back following the path in reverse. Dijkstra's algorithm uses priority queue to greedily select the closest node that has not been visited. Dijkstra’s algorithm cannot handle negative edge weights because if one of the neighbor nodes is already marked visited because its cost was lower than the current node’s cost, the negative edge weight can never be applied to its cost.
                </p>
                <p>
                  Without the application of binary heaps or fibonacci heaps, the time complexity for Dijkstra’s algorithm is at best O(nlog(n)) and at worst O(n<sup>2</sup>) depending on the number of nodes and edge weights.
                </p>
              </div>
              <aside className="show-pros-n-cons">
                <h3>Pros</h3>
                <ul className='pros-n-cons'>
                  <li><span>Uninformed algorithm. Does not need to know destination beforehand</span></li>
                  <li><span>Useful when trying to find multiple destinations as it provides the shortest path from one source node to all other nodes</span></li>
                </ul>
                <h3>Cons</h3>
                <ul className='pros-n-cons'>
                  <li><span>Fails with negative edge weights because visited nodes will never be visited again so the costs will never be re-evaluated</span></li>
                </ul>
              </aside>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default ShowDijkstras;
