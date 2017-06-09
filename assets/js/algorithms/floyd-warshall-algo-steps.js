import { floydWarshallAlgo } from "./floyd-warshall-algo";
import { cloneDeep } from "lodash";

export class floydWarshallAlgoSteps extends floydWarshallAlgo {
  constructor(nodelist, start, end, visual) {
    super(nodelist);
    this.steps = this.search(start, end);
    this.currStep = 0;
  }

  stepForward() {
    if (this.currStep > this.steps.length) return;
    // let node = this.steps[this.i];
    let visual = this.visualization,
        step = this.steps[this.currStep],
        { nodes, loops, tables } = step;

    loops.forEach((node, i) => {
      if (i === 2) {
        visual.highlightNode(node.id, "red");
      } else {
        visual.highlightNode(node.id, "green");
      }
    });

    let non_index_nodes = nodes.select(node => !loops.includes(node.id));

    non_index_nodes.forEach(node => {
      visual.highlightNode(node.id, "blue");
    });

    nodes.forEach((node, i) => {
      let child = nodes[i + 1];
      visual.highlightLink(node.id, child.id, "red");
    });

    this.currStep += 1;
  }

  stepBackward() {
    if (this.i <= 0) return;
    this.i -= 1;
    let node = this.steps[this.i];
    let visual = this.visualization;
    visual.unhighlightNode(node.id);
    if (node.parent) {
      visual.unhighlightLink(node.parent.id, node.id);
    }
  }

  search(start, end) {
    for (let k = 0; k < this.indices.length; k++) {
      for (let i = 0; i < this.indices.length; i++) {
        for (let j = 0; j < this.indices.length; j++) {
          let path = [i, j, k].map(idx => this.indices[idx]),
              nodes = this.pathDeconstructor(...path),
              loops = [i, j, k].map(idx => this.indices[idx]);

          if (this.costs[i][j] > this.costs[i][k] + this.costs[k][j]) {
            this.costs[i][j] = this.costs[i][k] + this.costs[k][j];
            this.parents[i][j] = this.parents[k][j];
          }

          let parents = _.cloneDeep(this.parents),
              costs = _.cloneDeep(this.costs);

          this.steps.push({nodes, loops, tables: { parents, costs }});
        }
      }
    }
    return this.steps;
  }
}
