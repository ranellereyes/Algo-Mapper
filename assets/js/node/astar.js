class Astar {
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

    // define f, g, and h cost
    for (let idx in list) {
      list[idx].f = 0;
      list[idx].g = 0;
      list[idx].h = 0;
      list[idx].parent = undefined;
    }

    // add starting node to open list
    this.openList.push(startNode);

    // run pathfinding until open list is empty
    while (this.openList.length > 0) {
      let lowIdx = 0;

      // find lowest node in open list with the lowest f cost
      for (var i = 0; i < this.openList.length; i++) {
        if (this.openList[i].f < this.openList[lowIdx].f) { lowIdx = i }
      }
      let currentNode = this.openList[lowIdx];

      // return path if current node is the end node
      if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
        let curr = currentNode;
        let path = [];
        debugger;
        while (curr.parent) {
          path.push(curr.id);
          curr = curr.parent;
        }
        path.push(curr.id);
        return path.reverse();
      }

      // calculate f, g, and h cost for each child node of the current node
      currentNode.children.forEach( node => {
        list[node.id].g = currentNode.g + node.weight;
        list[node.id].h = this.hcost(list[node.id], list[endNodeId]);
        list[node.id].f = list[node.id].g + list[node.id].h;
      });

      // add current node to close list and remove it from the open list
      this.closeList.push(this.openList.shift());

      this.childNodes(currentNode).forEach( node => {
        let newNode = list[node.id];
        currentNode.children.find( n => n.id === node.id);
        let gScore = currentNode.g + newNode.g;

        // add new child node to open list if not included
        if (!this.openList.includes(node)) {
          this.openList.push(node);
          list[node.id].parent = currentNode;
          list[node.id].g = gScore;
          list[node.id].f = list[node.id].g + list[node.id].h;

        // update existing node if g cost is lower in newly found path
        } else if (gScore < list[node.id].g) {
          list[node.id].parent = currentNode;
          list[node.id].g = gScore;
          list[node.id].f = list[node.id].g + list[node.id].h;
        }
      });
    }

    // return empty array if no path is found
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

export default Astar;
