import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST2 } from '../../algorithms/node';
import AstarSteps from '../../algorithms/astar_step';
import Highlight from 'react-highlight';
import Astar from '../../algorithms/astar';

class ShowAstar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;
    let visual = new Visualization(NODELIST2, 'visualization');
    visual.draw();
    this.setState({ graph: visual });
    this.AstarStep = new AstarSteps(NODELIST2, 1, 8, visual);
    this.fetchCode('static/javascript/astar.js');
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

  handleKeyPress(e) {
    if (e.keyCode === 37){
      this.AstarStep.stepBackward();
      document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    } else if (e.keyCode === 39){
      this.AstarStep.stepForward();
      document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    }
  }

  handleKeyUp (e) {
    document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_gray.png')";
    document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_gray.png')";
  }

  handleClickLeft(e) {
    this.handleKeyPress({keyCode:  37});
  }

  handleClickRight(e) {
    this.handleKeyPress({keyCode:  39});
  }

  render() {
    return (
      <div className="index-main">
        <main className="show-main">
          <section className="show-main">
            <h1 className="show-name">A* Algorithm</h1>
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
                <p>A* (pronounced as 'A star') uses a heuristic approach in finding the shortest paths. This heuristic is an arbitrary number based on the distance away from the end point. The general idea of A* utilizes an <code>openList</code> and a <code>closeList</code>, where the <code>openList</code> is an array of nodes to be checked and the <code>closeList</code> is an array of nodes that have been visited. As the algorithm runs, nodes are added and removed from these lists until either a path is found or the <code>openList</code> is empty. The steps are as follows:</p>
                <ol>
                  <li><span>Initialize the <code>openList</code> and <code>closeList</code> as two empty arrays</span></li>
                  <li><span>Set the starting node as <code>currentNode</code>, and add it to the openList</span></li>
                  <li><span>Calculates the f cost of the all child nodes by adding its weight (g cost) with its heuristic (h cost)</span></li>
                  <ul className='how-it-works'>
                  	<li><span><code>f(n) = g(n) + h(n)</code></span></li>
                  	<li><span><code>g</code> is the cost to reach a node, in this case dictated by the weight of an edge (the link between parent and child node)</span></li>
                  	<li><span><code>h</code> is defined by an arbitrary calculation based on the distance from the end node</span></li>
                  	<li><span><code>f</code> is equal to the sum of these two values</span></li>
                  </ul>
                  <li><span>If the child's cost has not been calculated yet, its cost values are saved and its parent is set to <code>currentNode</code>. If the child's cost values have already been calculated, the lowest cost values are saved and its parent is set to the node which yielded those lowest cost values</span></li>
                  <li><span>The currentNode is moved from the openList into the closeList</span></li>
                  <li><span>currentNode is reassigned to a node inside the openList with the lowest f cost</span></li>
                  <li><span>Repeat step 3 until destination is reached, or the openList is empty</span></li>
                </ol>
                <h3>Details</h3>
                <p>
                  The heuristic is what drastically differentiates A* from other algorithms. Although A* is typically O(n) time complexity, the pitfall is that unoptimized heuristics can lead to incorrect shortest path calculations. The most basic implementation of this heuristic is the linear distance away from the destination, but simply weighting this distance can drastically change solutions.
                </p>
                <p>
                  Typical A* implementations utilize priority queues, where the lowest cost values are evaluated and removed from the queue. Binary Heaps can further improve efficiently by organizing the queued nodes in a tree format. A* is extremely well-known for pathfinding, but is not as optimized for node paths. This is because if the node path is has N nodes and each node has N - 1 child nodes, every round of cost evaluation requires A* to make N - 1 calculations, resulting at worst in O(n<sup>n</sup>  ) time complexity.
                </p>
              </div>
              <aside className="show-pros-n-cons">
                <h3>Pros</h3>
                <ul className='pros-n-cons'>
                  <li><span>Generally very fast</span></li>
                  <li><span>Will always find a solution if it exists</span></li>
                  <li><span>One of the best algorithms for pathfinding</span></li>
                  <li><span>Time Complexity is O(n) using an optimized heuristic</span></li>
                </ul>
                <h3>Cons</h3>
                <ul className='pros-n-cons'>
                  <li><span>Not optimized for node maps, which can have N - 1 branches for each node</span></li>
                  <li><span>Time complexity is at worst exponential given unoptimized heuristic</span></li>
                  <li><span>Will not always find shortest path depending on heuristic</span></li>
                </ul>
              </aside>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default ShowAstar;
