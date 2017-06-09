class DijkstraSteps {
  constructor(nodeList, source, destination, visual) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.steps = [];
    this.visual = visual;
    this.costs = this.costs.bind(this);
    this.i = 0;
    this.source = this.nodeList[source];
    this.destination = this.nodeList[destination];
    this.initiate();
    this.search();
  }

  initiate() {
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

  search() {
    this.steps.push({path: [this.source.id], costs: [this.costs()]});
    let parent = {};
    let node = this.source;
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
    // console.log(this.steps);
    // create path from source to destination
    this.createPath(parent, this.source, this.destination);
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
    // console.log(path.reverse());
    return path.reverse();
  }

  stepFoward() {
    let steps = this.steps[this.i];
    let prev = this.steps[this.i - 1]
    // unhighlight previous node/links
    if (prev) {
      this.visual.unhighlightNode(prev.path[0]);
      this.visual.unhighlightNode(prev.path[1]);
      this.visual.unhighlightLink(prev.path[0], prev.path[1]);
    }
    //highlight current node/links
    this.visual.highlightNode(steps.path[0], "red");
    this.visual.highlightLink(steps.path[0], steps.path[1], "blue");
    this.visual.highlightNode(steps.path[1], "green");

    this.i++;
  }

}

export default DijkstraSteps;
