class DijkstraSteps {
  constructor(nodeList) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.steps = [];
    this.costs = this.costs.bind(this);
  }

  initiate(source) {
    source.weight = 0;
    source.cost = 0;
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
    this.initiate(this.nodeList[source])
    this.steps.push({path: [source], costs: [this.costs()]})
    let parent = {};
    let node = this.nodeList[source];
    while (this.unvisited.length !== 0) {
      node.children.sort((a,b) => a.weight - b.weight).forEach(child => {
        let _node;
        if (this.unvisited.indexOf(this.nodeList[child.id]) !== -1) {
          _node = this.nodeList[child.id];
          if (_node.cost > node.cost + child.weight) {
            _node.cost = node.cost + child.weight;
            parent[_node.id] = node.id;
          }
        }
        this.steps.push({path: [node.id, child.id], costs: [this.costs()]})
      });

      // adds node to visited list
      this.visited.push(node);
      // remove node from unvisited list
      this.unvisited.splice(this.unvisited.indexOf(node), 1);

      //choose node with lowest cost
      node = this.unvisited[0];
      for (let i = 1; i < this.unvisited.length; i++) {
        if (this.unvisited[i].cost < node.cost) {
          node = this.unvisited[i];
        }
      }
    }
    console.log(this.steps);
    // create path from source to destination
    this.createPath(parent, this.nodeList[source], this.nodeList[destination]);
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
