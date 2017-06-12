import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST2 } from '../../algorithms/node';
import FloydWarshallSteps from '../../algorithms/floyd_warshall_steps';
import Highlight from 'react-highlight';

class ShowFloyd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
    this.fetchCode = this.fetchCode.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;
    let visual = new Visualization(NODELIST2, "visualization");
    visual.draw();
    this.setState({ graph: visual });
    this.floyd = new FloydWarshallSteps(NODELIST2, 1, 8, visual);
    this.fetchCode('static/javascript/floyd_warshall.js');
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
      this.floyd.stepBackward();
      document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    } else if (e.keyCode === 39){
      this.floyd.stepForward();
      document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    }
  }
  handleKeyUp (e) {
    document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_gray.png')";
    document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_gray.png')";
  }

  handleClickLeft(e) {
    // this.handleKeyPress({keyCode:  37});
    this.floyd.stepBackward();
  }

  handleClickRight(e) {
    // this.handleKeyPress({keyCode:  39});
    this.floyd.stepForward();
  }

  render() {
    return (
      <div className="index-main">
        <main className="show-main">
          <section className="show-main">
            <h1 className="show-name">Floyd-Warshall</h1>
            <ul className="visualization">
              <div className="visualization" />
              <aside className="show-code">
                <Highlight class="javascript-snippet">
                  {this.code}
                </Highlight>
              </aside>
              <figure id="arrow_left" onClick={this.handleClickLeft}></figure>
              <figure id="arrow_right" onClick={this.handleClickRight} ></figure>
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
                  The Floyd-Warshall algorithm is an algorithm that finds the <code>cost</code> (shortest path) between all pairs of nodes within a graph. Similar to the Bellman-Ford algorithm, the Floyd-Warshall algorithm can handle negative edge weights when calculating the <code>cost</code>. Edge weights are numerical values that represent the <code>cost</code> of getting from one node to another connecting node. The Floyd-Warshall algorithm, in essence, finds the shortest path by keeping track of intermediate nodes between a pair of nodes.
                </p>
                <ol>
                  <li><span>Creates a <code>cost</code> and parent chart initialized with data from direct children.</span></li>
                  <li><span>Iterate through every pair of nodes with a intermediate node to pass through.</span></li>
                  <li><span>Check if the path with the intermediate node has a lower <code>cost</code> than the direct path. If so, replace parents with parent of intermediate-to node.</span></li>
                    <ul className='how-it-works'>
                      <li><span><code>init<code>cost</code>s</code> and <code>initParents</code> sets up the initial data from the given nodes</span></li>
                      <li><span>Imagine if the <code>cost</code> of <code>Node A</code> to <code>Node C</code> is 15. The <code>cost</code> of <code>Node A</code> to <code>Node B</code> is 4. The <code>cost</code> of <code>Node B</code> to <code>Node C</code> is 5.</span></li>
                      <li><span>The path from <code>Node A</code> to <code>Node B</code> to <code>Node C</code> is 9 (4 + 5), thus the parent of <code>Node A</code> to <code>Node C</code> is now <code>Node B</code></span></li>
                    </ul>
                  <li><span>After the algorithm is finished, use parental path to retrace the shortest path from a pair of nodes.</span></li>
              </ol>
                <h3>Details</h3>
                <p>
                  The Floyd-Warshall algorithm will always find the <code>cost</code> between all pairs of node within a graph. However, the algorithm will only ever have to run once to find the shortest path between any pair of nodes if the graph never changes because the data points are saved within the table the algorithm creates.
                </p>
                <p>
                  Because the Floyd-Warshall compares all possible paths between all pairs of nodes in a graph, the time complexity will always be at best and at worst O(n<sup>3</sup>).
                </p>
              </div>
              <aside className="show-pros-n-cons">
                <h3>Pros</h3>
                <ul className='pros-n-cons'>
                  <li><span>Finds the shortest path for every pair of nodes within a graph</span></li>
                  <li><span>Preloads entire nest</span></li>
                  <li><span>Checks for negative weight edges</span></li>
                  <li><span>Same best and worst time complexity</span></li>
                </ul>
                <h3>Cons</h3>
                <ul className='pros-n-cons'>
                  <li><span>Slow O(n<sup>3</sup>)</span></li>
                  <li><span>Cannot end iterations early</span></li>
                  <li><span>Requires O(n<sup>3</sup>) space complexity</span></li>
                  <li><span>Will have to redo calculations if a new node is added to the graph</span></li>
                </ul>
              </aside>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default ShowFloyd;
