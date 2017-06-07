// export class Node {
//   constructor(children, x, y, id) {
//     this.children = children;
//     this.x = x;
//     this.y = y;
//     this.id = id;
//   }
// }
// export const NODELIST = {
//   1: new Node([{ id: 2, weight: 10 }, { id: 3, weight: 5 }], 20, 20, 1),
//   2: new Node([{ id: 5, weight: 4 }], 40, 10, 2),
//   3: new Node([{ id: 5, weight: 5 }, { id: 4, weight: 7 }], 40, 30, 3),
//   4: new Node([{ id: 6, weight: 9 }], 60, 30, 4),
//   5: new Node([{ id: 6, weight: 2 }], 60, 10, 5),
//   6: new Node([{}], 80, 20, 6)
// }

class BellmanFord {
  constructor(nodeList) {

    this.nodeList = nodeList;
    this.edgeList = this.createEdgeList(nodeList);

    this.search = this.search.bind(this);
    this.steps = this.steps.bind(this);
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

  steps(startNodeId, endNodeId) {
    return [];
  }

  createEdgeList(nodeList) {
    let edges = [];
    Object.keys(nodeList).forEach((nodeId) => {
      nodeList[nodeId].children.forEach((child) => {
        edges.push({ fromId: nodeId, toId: child.id, weight: child.weight});
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
