class Dijkstra {
  constructor(nodeList, source, destination) {
    this.visited = [];
    this.unvisited = [];
    this.nodeList = nodeList;
    this.source = source;
    this.destination = destination;
  }

  initiate(source) {
    this.nodeList.forEach(node => {
      if (node !== this.source) {
        node.cost = Infinity;
        this.unvisited.push(node)
      }
    });
  }

}

export default Dijkstra;
