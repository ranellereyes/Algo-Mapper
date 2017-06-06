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
    this.openList = [];
    this.closeList = [];
    this.path = [];
    this.nodeList = nodeList;
    this.edgeList = this.createEdgeList(this.nodeList).bind(this);

    this.search = this.search.bind(this);
    this.steps = this.steps.bind(this);

  }

  search(startNodeId, endNodeId) {

  }

  steps(startNodeId, endNodeId) {

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
}

export default BellmanFord;
