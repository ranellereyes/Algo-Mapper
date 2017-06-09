import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../algorithms/node';
import AstarStep from '../../algorithms/astar_step';
import Highlight from 'react-highlight';
import Astar from '../../algorithms/astar';

class ShowAstar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
  }

  componentDidMount() {
    document.onkeydown = this.handleKeyPress;
    let visual = new Visualization(NODELIST);
    visual.draw();
    this.setState({ graph: visual });
    this.AstarStep = new AstarStep(NODELIST, 1, 6, visual);
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
    if (e.keyCode === 37) {
      this.AstarStep.stepBackward();
    } else if (e.keyCode === 39) {
      this.AstarStep.stepForward();
    }
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
              <figure onClick={this.handleClickLeft}></figure>
              <figure onClick={this.handleClickRight}></figure>
            </ul>
          </section>
        </main>
        <section className="show-algo-bottom">
          <div>
            <h1>Description</h1>
            <ul className="show-algo-description">
              <div className="show-how-it-works">
                <h3>How it Works</h3>
                <ol>
                  <p>A* (pronounced as 'A star') uses a heuristic approach in finding the shortest paths. This heuristic is an arbitrary number based on the distance away from the end point. The general idea of A* is its use of its <code>openList</code> and <code>closeList</code>, where the <code>openList</code> is an array of nodes to be checked and the <code>closeList</code> is an array of nodes that have been visited. As the algorithm runs, nodes are added and removed from these lists until either a path is found or the <code>openList</code> is empty:</p>
                  <li><b>1.</b> Initialize and openList and closeList as two empty arrays</li>
                  <li><b>2.</b> Set the starting node as <code>currentNode</code>, and add it to the openList</li>
                  <li><b>3.</b> Calculates the f cost of the all child nodes by adding its weight (g cost) with its heuristic (h cost)</li>
                  <ul className='how-it-works'>
                  	<li>- f(n) = g(n) + h(n) </li>
                  	<li>- g cost is the weight of the edge (the link between parent and child node)</li>
                  	<li>- h is defined by an arbitrary calculation based on the distance from the end node</li>
                  	<li>- f is equal to the sum of these two values</li>
                  </ul>
                  <li><b>4.</b> If child's cost has not been calculated yet, its cost values are saved and its parent is set to <code>currentNode</code>. If the child's cost values have already been calculated, the lowest cost values are saved and its parent is set to the node which yielded those lowest cost values</li>
                  <li><b>5.</b> The currentNode is moved from the openList into the closeList</li>
                  <li><b>6.</b> currentNode is reassigned to a node inside the openList with the lowest f cost</li>
                  <li><b>7.</b> Repeat step 3 until destination is reached, or the openList is empty</li>
                </ol>
                <h3>Math</h3>
                <p>
                  Pseudo Code
                  {`
                  function A*(start, goal)
                      // The set of nodes already evaluated
                      closedSet := {}

                      // The set of currently discovered nodes that are not evaluated yet.
                      // Initially, only the start node is known.
                      openSet := {start}

                      // For each node, which node it can most efficiently be reached from.
                      // If a node can be reached from many nodes, cameFrom will eventually contain the
                      // most efficient previous step.
                      cameFrom := the empty map

                      // For each node, the cost of getting from the start node to that node.
                      gScore := map with default value of Infinity

                      // The cost of going from start to start is zero.
                      gScore[start] := 0

                      // For each node, the total cost of getting from the start node to the goal
                      // by passing by that node. That value is partly known, partly heuristic.
                      fScore := map with default value of Infinity

                      // For the first node, that value is completely heuristic.
                      fScore[start] := heuristic_cost_estimate(start, goal)

                      while openSet is not empty
                          current := the node in openSet having the lowest fScore[] value
                          if current = goal
                              return reconstruct_path(cameFrom, current)

                          openSet.Remove(current)
                          closedSet.Add(current)

                          for each neighbor of current
                              if neighbor in closedSet
                                  continue		// Ignore the neighbor which is already evaluated.

                              if neighbor not in openSet	// Discover a new node
                                  openSet.Add(neighbor)

                              // The distance from start to a neighbor
                              tentative_gScore := gScore[current] + dist_between(current, neighbor)
                              else if tentative_gScore >= gScore[neighbor]
                                  continue		// This is not a better path.

                              // This path is the best until now. Record it!
                              cameFrom[neighbor] := current
                              gScore[neighbor] := tentative_gScore
                              fScore[neighbor] := gScore[neighbor] + heuristic_cost_estimate(neighbor, goal)

                      return failure

                  function reconstruct_path(cameFrom, current)
                      total_path := [current]
                      while current in cameFrom.Keys:
                          current := cameFrom[current]
                          total_path.append(current)
                      return total_path
                  `}
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
