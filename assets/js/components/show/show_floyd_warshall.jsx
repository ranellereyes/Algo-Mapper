import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../algorithms/node';
import floydWarshallAlgoSteps from '../../algorithms/floyd-warshall-algo-steps';

class ShowFloyd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
  }

  componentDidMount() {
    let visual = new Visualization(NODELIST);
    visual.draw();
    window.v = visual;
    this.setState({ graph: visual });
    this.floyd = new floydWarshallAlgoSteps(NODELIST, 1, 6, visual);
    window.a = this.AstarStep;
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  handleKeyPress (e) {
    console.log(e.keyCode);
    if (e.keyCode === 37){
      this.floyd.stepForward();
      console.log(e.keyCode, "left");
    } else if (e.keyCode === 39){
      this.floyd.stepBackward();
      console.log(e.keyCode, "right");
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
{`class BellmanFord {
constructor(nodeList) {

  this.nodeList = nodeList;
  this.edgeList = this.createEdgeList(nodeList);

  this.search = this.search.bind(this);
}

search(startNodeId, endNodeId) {
  let cost = {};
  let parents = {};

  Object.keys(this.nodeList).forEach((nodeId) => {
    cost[nodeId] = Infinity;
    parents[nodeId] = null;
  });

  cost[startNodeId] = 0;
  let finished = false;

  for (let i = 0; i < Object.keys(this.nodeList).length -1; i++) {
    finished = true;
    this.edgeList.forEach((edge) => {
      if (cost[edge.fromId] + edge.weight < cost[edge.toId]) {
        cost[edge.toId] = cost[edge.fromId] + edge.weight;
        parents[edge.toId] = edge.fromId;
        finished = false;
      }
    });
    if (finished) {
      break;
    }
  }

  return this.createPath(parents, startNodeId, endNodeId);
}

createEdgeList(nodeList) {
  let edges = [];
  Object.keys(nodeList).forEach((nodeId) => {
    nodeList[nodeId].children.forEach((child) => {
      edges.push({ fromId: nodeId, toId: String(child.id), weight: child.weight});
    });
  });
  return edges;
}

createPath (parents, startNodeId, endNodeId) {
  let path = [String(endNodeId)];
  let startKey = endNodeId;
  while (parents[startKey]) {
    path.push(parents[startKey]);
    startKey = parents[startKey];
  }
  return path.reverse();
}
}

export default BellmanFord;
`}
                </Highlight>
              </aside>
              <figure onClick={this.handleClickLeft}></figure>
              <figure onClick={this.handleClickRight} ></figure>
            </ul>
          </section>
        </main>
        <section className="show-algo-bottom">
          <div>
            <h1>Description</h1>
            <ul className="show-algo-description">
              <div className="show-how-it-works">
                <h3>How it Works</h3>
                <p>asdfaf  EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.
                </p>
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

export default Show;
