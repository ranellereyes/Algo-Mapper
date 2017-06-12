class Dijkstra {
  constructor(nodeList) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
  }
  //Sets source node to cost 0 and all other node's cost to Infinity
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
  //Find shortest path from source node to destination node
  search(source, destination) {
    this.initiate(this.nodeList[source])
    let parent = {};
    let currentNode = this.nodeList[source];
    while (this.unvisited.length !== 0) {
      currentNode.children.sort((a,b) => a.weight - b.weight).forEach(child => {
        let neighbor;
        if (this.unvisited.indexOf(this.nodeList[child.id]) !== -1) {
          neighbor = this.nodeList[child.id];
          if (neighbor.cost > currentNode.cost + child.weight) {
            neighbor.cost = currentNode.cost + child.weight;
            parent[neighbor.id] = currentNode.id;
          }
        }
      });
      // adds currentNode to visited list
      this.visited.push(currentNode);
      // remove currentNode from unvisited list
      this.unvisited.splice(this.unvisited.indexOf(currentNode), 1);

      //choose currentNode with lowest cost
      currentNode = this.unvisited[0];
      for (let i = 1; i < this.unvisited.length; i++) {
        if (this.unvisited[i].cost < currentNode.cost) {
          currentNode = this.unvisited[i];
        }
      }
    }
    // create path from source to destination
    this.createPath(parent, this.nodeList[source], this.nodeList[destination]);
  }

  createPath(parent, source, destination) {
    let path = [destination.id];
    let startKey = destination.id;
    while (parent[startKey]) {
      path.push(parent[startKey]);
      startKey = parent[startKey];
    }
    return path.reverse();
  }
}
