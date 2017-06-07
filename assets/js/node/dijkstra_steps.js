class DijkstraSteps {
  constructor(nodeList) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
  }

  initiate(source) {
    this.source.weigth = 0;
    this.source.cost = 0;
    this.unvisited.push(source);
    Object.keys(this.nodeList).forEach(id => {
      let node = this.nodeList[id];
      if (node !== source) {
        node.cost = Infinity;
        this.unvisited.push(node)
      }
    });
  }
}
