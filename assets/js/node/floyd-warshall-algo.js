// TESTING STUFF
// import { NODELIST, NODELIST2 } from "./node";

export class floydWarshallAlgo {
  constructor (nodelist) {
    this.nodelist = nodelist;
    this.indices = Object.keys(nodelist);
    this.costs = Object.keys(nodelist).map(e => new Array);
    this.parents = Object.keys(nodelist).map(e => new Array);
    this.initCosts = this.initCosts.bind(this);
    window.parents = this.parents;
    window.costs = this.costs;

    this.initCosts();
    this.initParents();
  }

  initCosts () {
    this.costs.forEach((row, i) => {
      this.costs.forEach((ele, j) => {
        if (i === j) {
          this.costs[i][j] = 0;
        } else {
          this.costs[i][j] = Infinity;
        }
      });
    });

    Object.keys(this.nodelist).forEach(nodeId => {
      this.nodelist[nodeId].children.forEach(child => {
        let nodeIdx = this.indices.indexOf(nodeId),
            childIdx = this.indices.indexOf(String(child.id));
        this.costs[nodeIdx][childIdx] = child.weight;
      });
    });
  }

  initParents () {
    Object.keys(this.nodelist).forEach(nodeId => {
      this.nodelist[nodeId].children.forEach(child => {
        let nodeIdx = this.indices.indexOf(nodeId),
            childIdx = this.indices.indexOf(String(child.id));

        this.parents[nodeIdx][childIdx] = nodeId;
      });
    });

    for (let i = 0; i < this.parents.length; i++) {
      for (let j = 0; j < this.parents.length; j++) {
        if (i === j) {
          this.parents[i][j] = null;
        } else if (!this.parents[i][j]) {
          this.parents[i][j] = 'orphan D=';
        }
      }
    }
  }

  pathDeconstructor(start, end, intermediate = null) {
    let path = [end],
        startIdx = this.indices.indexOf(start),
        endIdx = this.indices.indexOf(end),
        intIdx = this.indices.indexOf(intermediate);

    if (intIdx > -1) {
      while (intermediate !== path[0]) {
        path.unshift(this.parents[intIdx][this.indices.indexOf(path[0])]);
      }
    }

    while (start !== path[0]) {
      path.unshift(this.parents[startIdx][this.indices.indexOf(path[0])]);
    }

    return path;
  }

  search (start, end) {
    for (let k = 0; k < this.indices.length; k++) {
      for (let i = 0; i < this.indices.length; i++) {
        for (let j = 0; j < this.indices.length; j++) {
          if (this.costs[i][j] > this.costs[i][k] + this.costs[k][j]) {
            this.costs[i][j] = this.costs[i][k] + this.costs[k][j];
            this.parents[i][j] = this.parents[k][j];
          }
        }
      }
    }

    // Parsed into helper function
    // let path = [end],
    //     startIdx = this.indices.indexOf(start),
    //     endIdx = this.indices.indexOf(end);
    //
    // while (start !== path[0]) {
    //   path.unshift(this.parents[startIdx][this.indices.indexOf(path[0])]);
    // }

    return this.pathDeconstructor(start, end);
  }
}
