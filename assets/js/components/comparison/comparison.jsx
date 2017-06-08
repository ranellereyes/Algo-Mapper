import React from 'react';
import Graph from '../../d3/graph';
import Highlight from 'react-highlight';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    let visual = new Graph();
    visual.draw();
    window.v = visual;
    this.setState({ graph: visual });
  }

  render() {
    return (
      <div className="index-main">
        <main className="comp-main">
          <section className="comp-main">
            <ul className="comp-visualization">
              <li>
                <select>
                  <option value="dijkstra">Dijkstra</option>
                  <option value="astar">A* Algorithm</option>
                  <option value="bellman-ford">Bellman-Ford</option>
                  <option value="floyd-warshall">Floyd-Warshall</option>
                </select>
                <div className="comp-visualization" />
              </li>
              <li>
                <select>
                  <option value="dijkstra">Dijkstra</option>
                  <option value="astar">A* Algorithm</option>
                  <option value="bellman-ford">Bellman-Ford</option>
                  <option value="floyd-warshall">Floyd-Warshall</option>
                </select>
                <div className="comp-visualization" />
              </li>
            </ul>
          </section>
          <section className="comp-arrows">
            <figure></figure>
            <figure></figure>
          </section>
          <section className="comp-graph">
            <ul>
              <li className="comp-graph-code">
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
              </li>
              <div className="comp-graph">
              </div>
              <li className="comp-graph-code">
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
              </li>
            </ul>
          </section>

        </main>
      </div>
    );
  }
}

export default Comparison;
