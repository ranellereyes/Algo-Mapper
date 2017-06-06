class Dijkstra {
  constructor(nodeList, source, destination) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.source = this.nodeList[1]; // nodeList[#]
    this.destination = destination; // nodeList[#]
  }

  initiate(source) {
    // this.source.weigth = 0;
    Object.keys(this.nodeList).forEach(id => {
      let node = this.nodeList[id];
      if (node !== this.source) {
        node.cost = Infinity;
        this.unvisited.push(node)
      }
    });
  }




}

export default Dijkstra;
