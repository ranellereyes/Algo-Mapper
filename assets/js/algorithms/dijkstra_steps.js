class DijkstraSteps {
  constructor(nodeList, source, destination, visual) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.steps = [];
    this.visual = visual;
    this.costs = this.costs.bind(this);
    this.i = -1;
    this.source = this.nodeList[source];
    this.destination = this.nodeList[destination];
    this.initiate();
    this.search();
    this.path;
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
    this.steps.push({path: [this.source.id], costs: this.costs()});
    let parent = {};
    let node = this.source;
    while (this.unvisited.length !== 0 && !this.visited.includes(this.destination)) {
      node.children.sort((a,b) => a.weight - b.weight).forEach(child => {
        let _node;
        if (this.unvisited.indexOf(this.nodeList[child.id]) !== -1) {
          _node = this.nodeList[child.id];
          if (_node.cost > node.cost + child.weight) {
            _node.cost = node.cost + child.weight;
            parent[_node.id] = node.id;
          }
        }
        this.steps.push({path: [node.id, child.id], costs: this.costs()})
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
    this.path = this.createPath(parent, this.source, this.destination);
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

  stepForward() {
    //moves on to next step
    this.i++;
    let steps = this.steps[this.i];
    let prev = this.steps[this.i - 1]
    if (this.i === this.steps.length) {
      Object.keys(this.nodeList).forEach(node => {
        this.visual.unhighlightNode(node);
        this.visual.unhighlightLink(prev.path[0], prev.path[1])
      });
      this.path.forEach((node, idx) => {
        this.visual.highlightNode(node, "red");
        this.visual.highlightLink(node, this.path[idx + 1])
      });
      this.i--;
    }
    // unhighlight previous node/links
    else {
      Object.keys(this.nodeList).forEach(node => this.visual.removeText(node));
      steps.costs.forEach((cost,idx) => {
        if (cost === Infinity) {
          this.visual.addText(idx + 1, -6, -25, "red", (d) => "∞");
        } else if (cost < 10 && cost >= 0) {
          this.visual.addText(idx + 1, -5, -28, "red", (d) => cost);
        } else {
          this.visual.addText(idx + 1, -7, -28, "red", (d) => cost);
        }
      });
      if (prev) {
        this.visual.unhighlightNode(prev.path[0]);
        this.visual.unhighlightNode(prev.path[1]);
        this.visual.unhighlightLink(prev.path[0], prev.path[1]);
      }
      //highlight current node/links
      if (steps) {
        this.visual.highlightNode(steps.path[0], "red");
        this.visual.animateLink(steps.path[0], steps.path[1], "purple")
        this.visual.highlightLink(steps.path[0], steps.path[1], "blue");
        this.visual.highlightNode(steps.path[1], "green");
      }
    }
  }

  stepBackward() {
    this.i--;
    let steps = this.steps[this.i];
    let forw = this.steps[this.i + 1];
    if (this.i < -1) {
      Object.keys(this.nodeList).forEach(node => this.visual.removeText(node));
      this.i++;
    } else if (this.i === -1) {
        Object.keys(this.nodeList).forEach(node => this.visual.removeText(node));
    }

    //unhighlight foward node/links
    if (forw) {
      Object.keys(this.nodeList).forEach(node => {
        this.visual.unhighlightNode(node);
        this.visual.unhighlightLink(forw.path[0], forw.path[1])
      });
      this.path.forEach((node, idx) => {
        // this.visual.highlightNode(node, "red");
        this.visual.unhighlightLink(node, this.path[idx + 1])
      });
    }
    //highlight current node/links
    if (steps) {
      Object.keys(this.nodeList).forEach(node => this.visual.removeText(node));
      steps.costs.forEach((cost,idx) => {
        if (cost === Infinity) {
          this.visual.addText(idx + 1, -6, -25, "red", (d) => "∞");
        } else if (cost < 10 && cost >= 0) {
          this.visual.addText(idx + 1, -5, -28, "red", (d) => cost);
        } else {
          this.visual.addText(idx + 1, -7, -28, "red", (d) => cost);
        }
      });
      this.visual.highlightNode(steps.path[0], "red");
      this.visual.highlightLink(steps.path[0], steps.path[1], "blue");
      this.visual.highlightNode(steps.path[1], "green");
    }

  }

}

export default DijkstraSteps;
