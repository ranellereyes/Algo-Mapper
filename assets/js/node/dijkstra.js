class Dijkstra {
  constructor(nodeList, source, destination) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.source = this.nodeList[1]; // nodeList[#]
    this.destination = destination; // nodeList[#]
  }

  initiate(source) {
    this.source.weight = 0;
    this.unvisited.push(this.source);
    Object.keys(this.nodeList).forEach(id => {
      let node = this.nodeList[id];
      if (node !== this.source) {
        node.cost = Infinity;
        this.unvisited.push(node)
      }
    });
  }

  search(source, destination) {
    let node = this.source;
    let lowestCost;
    while (this.unvisited.length !== 6) {
      node.children.forEach(child => {
        if (this.unvisited.indexOf(child) != -1) {
          child.cost = child.weight + node.weight
        }
        lowestCost = lowestCost < child.cost ? lowestCost : child;
      });

      // removes node from unvisted list and adds to visited list
      this.visited.push(node);
      this.unvisited.splice(this.unvisited.indexOf(node), 1);
      // debugger
    }
  }






}

export default Dijkstra;
