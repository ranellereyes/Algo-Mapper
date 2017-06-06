class Node {
  constructor(parentId, children, x, y) {
    this.parentId = parentId;
    this.childId = children;
    this.weight = weight;
    this.x = x;
    this.y = y;
  }
}

const NODELIST = {
  1: new Node([{ id: 2, weight: 10 }, { id: 3, weight: 5 }], 20, 20),
  2: new Node([{ id: 5, weight: 8 }], 40, 10),
  3: new Node([{ id: 5, weight: 5 }, { id: 4, weight: 7 }], 40, 30),
  4: new Node([{ id: 6, weight: 9 }], 60, 30),
  5: new Node([{ id: 6, weight: 2 }], 60, 10),
  6: new Node([{}], 80, 20)
}

class Astar {
  constructor() {
    this.openList = [];
    this.closeList = [];
    this.path = [];
  }

  search(nodeList, startNodeId, endNodeId) {
    let list = nodeList;
    for (let idx in list) {
      list[idx].f = 0;
      list[idx].g = 0;
      list[idx].h = 0;
    }
    this.openList.push(list[startNodeId]);


    while (this.openList.length > 0) {
      this.closeList.push(this.openList[0]);
      this.openList = this.openList.slice(1);

      let lowIdx = 0;
      for (var i = 0; i < this.openList.length; i++) {
        if (this.openList[i].f < this.openList[lowIdx].f) { lowIdx = i }
      }
      let current = this.openList[lowIdx];

    }
    return []
  }

  nearbyNodes() {

  }
}
