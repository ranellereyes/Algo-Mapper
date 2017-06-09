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
                  <p>A* (pronounced as 'A star') uses a heuristic approach in finding the shortest paths. This heuristic is an arbitrary number based on the distance away from the end point. The general idea of A* is its use of its openList and closeList. As the algorithm runs, it finds child nodes and appends them to the openList. The openList stores all nodes that are currently known (i.e. they have been seen by the algorithm, but not visited yet). Once a node has been visited (i.e. it has been set as the <code>currentNode</code>, and its child nodes cost values have been calculated), the <code>currentNode</code> is taken out of the openList and appended to the closeList. If a node is seen more than once, its cost values will be recalculated and its parent will be set to the node which yielded the lowest f cost. This process is repeated until the end point is found. The general process of A* can be explained in the following way:</p>
                  <li>1. Initialize and openList and closeList as two empty arrays</li>
                  <li>2. Set the starting node as <code>currentNode</code>, and add it to the openList</li>
                  <li>3. Calculates the f cost of the all child nodes by adding its weight (g cost) with its heuristic (h cost)</li>
                  <ul className='how-it-works'>
                  	<li>- Ex. f(n) = g(n) + h(n) </li>
                  	<li>- g cost is the weight of the edge (the link between parent and child node)</li>
                  	<li>- h is defined by an arbitrary calculation based on the distance from the end node</li>
                  	<li>- f is equal to the sum of these two values</li>
                  </ul>
                  <li>4. If child's cost has not been calculated yet, its cost values are saved and its parent is set to <code>currentNode</code>. If the child's cost values have already been calculated, the lowest cost values are saved and its parent is set to the node which yielded those lowest cost values</li>
                  <li>5. The currentNode is moved from the openList into the closeList</li>
                  <li>6. currentNode is reassigned to a node inside the openList with the lowest f cost</li>
                  <li>7. Repeat step 3 until destination is reached, or the openList is empty</li>
                </ol>
                <h3>Math</h3>
                <p>asdfasdf  EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.
                </p>
              </div>
              <aside className="show-pros-n-cons">
                <h3>Pros & Cons</h3>
                <p>asdfas
                </p>
              </aside>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default ShowAstar;
