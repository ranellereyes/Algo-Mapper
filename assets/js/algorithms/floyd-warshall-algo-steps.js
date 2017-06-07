import { floydWarshallAlgo } from "./floyd-warshall-algo";
import { cloneDeep } from "lodash";

export class floydWarshallAlgoSteps extends floydWarshallAlgo {
  constructor(nodelist) {
    super(nodelist);
    this.steps = [];
  }

  search(start, end) {
    for (let k = 0; k < this.indices.length; k++) {
      for (let i = 0; i < this.indices.length; i++) {
        for (let j = 0; j < this.indices.length; j++) {
          let path = [i, j, k].map(idx => this.indices[idx]),
              nodes = this.pathDeconstructor(...path);

          if (this.costs[i][j] > this.costs[i][k] + this.costs[k][j]) {
            this.costs[i][j] = this.costs[i][k] + this.costs[k][j];
            this.parents[i][j] = this.parents[k][j];
          }

          let parents = _.cloneDeep(this.parents),
              costs = _.cloneDeep(this.costs);

          this.steps.push({nodes, tables: { parents, costs }});
        }
      }
    }
    return this.steps;
  }
}
