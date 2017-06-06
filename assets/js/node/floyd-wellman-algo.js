import NODELIST from "./node";

class floydWarshallAlgo {
  constructor (nodelist) {
    this.nodelist = nodelist;
    this.indices = Object.keys(nodelist);
    this.costs = Object.keys(NODELIST).map(e => new Array);
    this.parents = Object.keys(NODELIST).map(e => new Array);
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

    this.nodelist.forEach(node => {
      node.children.forEach(child => {
        let nodeIdx = this.indices.indexOf(node.id),
            childIdx = this.indices.indexOf(child.id);

        this.costs[nodeIdx][childIdx] = child.weight;
      });
    });
  }

  initParents () {
    const indices = Object.keys(NODELIST);

    this.nodelist.forEach(node => {
      node.children.forEach(child => {
        let nodeIdx = this.indices.indexOf(node.id),
            childIdx = this.indices.indexOf(child.id);

        this.costs[nodeIdx][childIdx] = node.id;
      });
    });

    for (let i = 0; i < this.parents.length; i++) {
      for (let j = 0; i < this.parents.length; j++) {
        if (i === j) {
          this.parents[i][j] = null;
        } else if (this.parents[i][j]) {
          this.parents[i][j] = -1;
        }
      }
    }
  }
}

window.NODELIST = NODELIST;
window.fw = new floydWarshallAlgo(NODELIST);
