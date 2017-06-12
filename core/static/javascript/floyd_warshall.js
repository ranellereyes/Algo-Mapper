export default class FloydWarshall {
  constructor (nodelist) {
    this.nodelist = nodelist;
    this.indices = Object.keys(nodelist);
    this.costs = Object.keys(nodelist).map(e => new Array);
    this.parents = Object.keys(nodelist).map(e => new Array);

    this.initCosts();
    this.initParents();
  }

  initCosts () {
    // Initialize costs from node to every other node,
    // 0 if referencing itself, Infinity otherwise
    this.costs.forEach((row, i) => {
      this.costs.forEach((ele, j) => {
        if (i === j) {
          this.costs[i][j] = 0;
        } else {
          this.costs[i][j] = Infinity;
        }
      });
    });

    // Initialize costs for all nodes to its direct children
    Object.keys(this.nodelist).forEach(nodeId => {
      this.nodelist[nodeId].children.forEach(child => {
        let nodeIdx = this.indices.indexOf(nodeId),
            childIdx = this.indices.indexOf(String(child.id));
        this.costs[nodeIdx][childIdx] = child.weight;
      });
    });
  }

  initParents () {
    // Every node's children now references its direct parent
    Object.keys(this.nodelist).forEach(nodeId => {
      this.nodelist[nodeId].children.forEach(child => {
        let nodeIdx = this.indices.indexOf(nodeId),
            childIdx = this.indices.indexOf(String(child.id));

        this.parents[nodeIdx][childIdx] = nodeId;
      });
    });

    // Any node that is not a direct descendant or itself
    // is set to be null
    for (let i = 0; i < this.parents.length; i++) {
      for (let j = 0; j < this.parents.length; j++) {
        if (!this.parents[i][j]) {
          this.parents[i][j] = null;
        }
      }
    }
  }

  pathDeconstructor(start, end, intermediate = null) {
    // Deconstructs two paths from a node's reference to parent
    let path = [end],
        startIdx = this.indices.indexOf(start),
        endIdx = this.indices.indexOf(end),
        intIdx = this.indices.indexOf(intermediate);

    // Deconstructs path from intIdx to endIdx
    // Only if intermediate node is present
    if (intIdx > -1) {
      while (intermediate !== path[0]) {
        let parent = this.parents[intIdx][this.indices.indexOf(path[0])];
        if (!parent) { break; }
        path.unshift(parent);
      }
    }

    // Deconstructs path from previous path to start
    while (start !== path[0]) {
      let parent = this.parents[startIdx][this.indices.indexOf(path[0])];
      if (!parent) {
        path.unshift(start);
        break;
      }
      path.unshift(parent);
    }

    return path;
  }

  search (start, end) {
    for (let k = 0; k < this.indices.length; k++) {
      for (let i = 0; i < this.indices.length; i++) {
        for (let j = 0; j < this.indices.length; j++) {
          // i = Start, j = End, k = Intermediate node
          if (this.costs[i][j] > this.costs[i][k] + this.costs[k][j]) {
            // If travelling thru intermediate node is less of a cost
            // new cost is set to be through the intermediate node
            // And parent from i to j is now set to be the parent from k to j
            this.costs[i][j] = this.costs[i][k] + this.costs[k][j];
            this.parents[i][j] = this.parents[k][j];
          }
        }
      }
    }

    return this.pathDeconstructor(start, end);
  }
}
