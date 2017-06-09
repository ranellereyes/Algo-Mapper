import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../algorithms/node';
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
    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;
    let visual = new Visualization(NODELIST);
    visual.draw();
    this.setState({ graph: visual });
    this.algorithm = new DijkstraSteps(NODELIST, 1, 6, visual);
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
{`class Dijkstra {
  constructor(nodeList) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
  }

  initiate(source) {
    source.weight = 0;
    source.cost = 0;
    this.unvisited.push(source);
    Object.keys(this.nodeList).forEach(id => {
      let node = this.nodeList[id];
      if (node !== source) {
        node.cost = Infinity;
        this.unvisited.push(node);
      }
    });
  }

  search(source, destination) {
    this.initiate(this.nodeList[source])
    let parent = {};
    let node = this.nodeList[source];
    while (this.unvisited.length !== 0) {
      node.children.sort((a,b) => a.weight - b.weight).forEach(child => {
        let _node;
        if (this.unvisited.indexOf(this.nodeList[child.id]) !== -1) {
          _node = this.nodeList[child.id];
          if (_node.cost > node.cost + child.weight) {
            _node.cost = node.cost + child.weight;
            parent[_node.id] = node.id;
          }
        }
      });
      this.visited.push(node);
      this.unvisited.splice(this.unvisited.indexOf(node), 1);


      node = this.unvisited[0]
      for (let i = 1; i < this.unvisited.length; i++) {
        if (this.unvisited[i].cost < node.cost) {
          node = this.unvisited[i];
        }
      }
    }
    this.createPath(parent, this.nodeList[source], this.nodeList[destination]);
  }

  createPath(parent, source, destination) {
    let path = [destination.id];
    let startKey = destination.id;
    while (parent[startKey]) {
      path.push(parent[startKey]);
      startKey = parent[startKey]
    }
    return path.reverse();
  }


}

export default Dijkstra;
`}
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
                  Breadth-first Search
                  <br/>
                  Greedily finds the cost from a source node to a destination node or all other nodes within a graph that does not contain negative edge(s).
                  <ul className="dijkstra_steps">
                    <li>1. Assign a source node and set its cost to 0. Set all other nodes' cost to infinity.</li>
                    <li>2. Set source node to current node and mark all nodes as unvisisted.</li>
                    <li>3. Find all unvisisted neighbors (children) of current node and calculates the tentative cost to each neighbor. If the tentative cost to the neighbor is less than the neighbor's current cost, set its cost to the tentative cost.</li>
                    <li>4. After the current node checks all of its unvisited neighbors, mark the current node as visited. Visited nodes will never be checked again.</li>
                    <li>5. If all nodes have been visited or the destination node as been visited, the algorithm is finished and stops. Else, the current node is set to the node with the lowest cost and return back to step 3.</li>
                  </ul>
                </p>
                <h3>Math</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <aside className="show-pros-n-cons">
                <h3>Pros & Cons</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </aside>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default ShowDijkstras;
