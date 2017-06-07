class DijkstraSteps {
  constructor(nodeList) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.steps = [];
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

  search(source, destination) {
    let parent = {};
    let node = this.nodeList[source];
    while (this.unvisited.length !== 0) {
      let step = {};
      node.children.sort((a,b) => a.weight - b.weight).forEach(child => {
        let _node;
        if (this.unvisited.indexOf(this.nodeList[child.id]) !== -1) {
          _node = this.nodeList[child.id];
        }
      })
    }

  }



}

export default DijkstraSteps;
