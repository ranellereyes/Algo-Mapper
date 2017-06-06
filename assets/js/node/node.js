export class Node {
  constructor(children, x, y, id) {
    this.children = children;
    this.x = x;
    this.y = y;
    this.id = id;
  }
}

export const NODELIST = {
  1: new Node([{ id: 2, weight: 10 }, { id: 3, weight: 5 }], 20, 20, 1),
  2: new Node([{ id: 5, weight: 4 }], 40, 10, 2),
  3: new Node([{ id: 5, weight: 5 }, { id: 4, weight: 7 }], 40, 30, 3),
  4: new Node([{ id: 6, weight: 9 }], 60, 30, 4),
  5: new Node([{ id: 6, weight: 2 }], 60, 10, 5),
  6: new Node([{}], 80, 20, 6)
}

export class Astar {
  constructor(nodeList) {
    this.openList = [];
    this.closeList = [];
    this.path = [];
    this.nodeList = nodeList;
  }

  search(startNodeId, endNodeId) {
    let list = this.nodeList;
    let endNode = list[endNodeId];
    let startNode = list[startNodeId];
    for (let idx in list) {
      list[idx].f = 0;
      list[idx].g = 0;
      list[idx].h = 0;
      list[idx].parent = undefined;
    }
    this.openList.push(startNode);


    while (this.openList.length > 0) {
      let lowIdx = 0;
      for (var i = 0; i < this.openList.length; i++) {
        if (this.openList[i].f < this.openList[lowIdx].f) { lowIdx = i }
      }
      let currentNode = this.openList[lowIdx];

      if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
        let curr = currentNode;
        let path = [];
        while (curr.parent) {
          path.push(curr.id);
          curr = curr.parent;
        }
        path.push(curr.id);
        return path.reverse();
      }

      currentNode.children.forEach( node => {
        list[node.id].g = currentNode.g + node.weight;
        list[node.id].h = this.hcost(list[node.id], list[endNodeId]);
        list[node.id].f = list[node.id].g + list[node.id].h;
      });

      this.closeList.push(this.openList.shift());

      this.childNodes(currentNode).forEach( node => {
        let newNode = list[node.id];
        currentNode.children.find( n => n.id === node.id);
        let gScore = currentNode.g + newNode.g;
        if (gScore < list[node.id].g) {
          list[node.id].parent = currentNode;
          list[node.id].g = gScore;
          list[node.id].f = list[node.id].g + list[node.id].h;
        } else if (!this.openList.includes(node)) {
          this.openList.push(node);
          list[node.id].parent = currentNode;
          list[node.id].g = gScore;
          list[node.id].f = list[node.id].g + list[node.id].h;
        }
      });
    }
    return []
  }

  childNodes(currentNode) {
    let childNodes = [];
    for (let idx in this.nodeList) {
      currentNode.children.forEach( node => {
        if (node.id == idx) {
          childNodes.push(this.nodeList[idx])
        }
      });
    }
    return childNodes;
  }

  hcost(node, endNode) {
    return Math.sqrt(
      Math.abs(node.x ** 2 - endNode.x ** 2)  + Math.abs(node.y ** 2 - endNode.y ** 2)
    );
  }
}
