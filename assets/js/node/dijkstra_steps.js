class DijkstraSteps {
  constructor(nodeList, source) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.steps = [];
    this.costs = this.costs.bind(this);
    this.source = source || this.nodeList[1]; // nodeList[#]
  }

  initiate(source) {
    this.source.weight = 0;
    this.source.cost = 0;
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
    this.steps.push({path: [source], costs: [this.costs()]})
    let parent = {};
    let node = this.nodeList[source];
    while (this.unvisited.length !== 0) {
      let step = {};
      node.children.sort((a,b) => a.weight - b.weight).forEach(child => {
        let _node;
        if (this.unvisited.indexOf(this.nodeList[child.id]) !== -1) {
          _node = this.nodeList[child.id];
          if (_node.cost > node.cost + child.weight) {
            _node.cost = node.cost + child.weight;
            parent[_node.id] = node.id;
          }
          _node.cost = node.cost + child.weight;
        }
        this.steps.push({path: [node.id, child.id], costs: [this.costs()]})
      });

      this.visited.push(node);

      this.unvisited.splice(this.unvisited.indexOf(node), 1);

      node = this.unvisited[0];
      for (let i = 1; i < this.unvisited.length; i++) {
        if (this.unvisited[i].cost < node.cost) {
          node = this.unvisited[i];
        }
      }
    }
    console.log(this.steps);
    this.createPath(parent, source, destination);

  }

  costs() {
    let stepCost = [];
    for (var i = 0; i < Object.keys(this.nodeList).length; i++) {
      stepCost.push(this.nodeList[i + 1].cost)
    }
    return stepCost;
  }

  createPath(parent, source, destination) {
    let path = [destination.id];
    let startKey = destination.id;
    while (parent[startKey]) {
      path.push(parent[startKey]);
      startKey = parent[startKey]
    }
    console.log(path.reverse());
    return path.reverse();
  }

}

export default DijkstraSteps;
