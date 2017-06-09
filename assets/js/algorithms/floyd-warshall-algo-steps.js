import { floydWarshallAlgo } from "./floyd-warshall-algo";
import { cloneDeep } from "lodash";

export default class FloydWarshallAlgoSteps extends floydWarshallAlgo {
  constructor(nodelist, start, end, visual) {
    super(nodelist);
    this.visualization = visual;
    this.steps = [];
    this.search(start, end);
    this.currStep = 0;
  }

  clear() {
    d3.selectAll(".node")
    .transition()
    .duration(500)
    .style("fill", "lightblue");

    let nodeIds = Object.keys(this.nodelist).map(e => Number(e));

    nodeIds.forEach(id => {
      nodeIds.forEach(id2 => {
        this.visualization.unhighlightLink(id, id2);
      });
    });
  }

  draw(currStep) {
    let visual = this.visualization,
    step = this.steps[this.currStep],
    { nodes, loops, tables } = step;

    loops.forEach((node, i) => {
      switch (i) {
        case 0:
          visual.highlightNode(node, "lightgreen");
          break;
        case 1:
          visual.highlightNode(node, "green");
          break;
        case 2:
          visual.highlightNode(node, "yellow");
          break;
        default:
          return;
      }

      // if (i === 2) {
      //   visual.highlightNode(node, "red");
      // } else {
      //   visual.highlightNode(node, "green");
      // }
    });

    let non_index_nodes = nodes.filter(node => !loops.includes(node));

    if (non_index_nodes.length > 0) {
      non_index_nodes.forEach(node => {
        visual.highlightNode(node, "lightgreen");
      });
    }

    nodes.forEach((node, i) => {
      let child = nodes[i + 1];
      visual.highlightLink(node, child, "red");
    });
  }

  stepForward() {
    if (this.currStep > this.steps.length) return;

    this.currStep += 1;
    this.clear();
    this.draw(this.steps[this.currStep]);
  }

  stepBackward() {
    if (this.currStep <= 0) return;

    this.currStep -= 1;
    this.clear();
    this.draw(this.steps[this.currStep]);
  }

  search(start, end) {
    for (let k = 0; k < this.indices.length; k++) {
      for (let i = 0; i < this.indices.length; i++) {
        for (let j = 0; j < this.indices.length; j++) {
          let path = [i, j, k].map(idx => this.indices[idx]),
              nodes = this.pathDeconstructor(...path).map(id => parseInt(id)),
              loops = [i, j, k].map(idx => parseInt(this.indices[idx]));

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
