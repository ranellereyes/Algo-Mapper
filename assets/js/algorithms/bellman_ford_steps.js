import BellmanFord from './bellman_ford';
import { merge } from 'lodash';

class BellmanFordSteps extends BellmanFord{
  constructor(nodeList) {
    super(nodeList);
    this.nodeList = nodeList;
    this.edgeList = this.createEdgeList(nodeList);

    this.search = this.search.bind(this);
  }

  search(startNodeId, endNodeId) {
    let cost = {};
    let parents = {};

    Object.keys(this.nodeList).forEach((nodeId) => {
      cost[nodeId] = Infinity;
      parents[nodeId] = null;
    });

    let steps = [merge({},{
                  node: [String(startNodeId)],
                  cost: cost})];

    cost[startNodeId] = 0;
    let finished = false;

    for (let i = 0; i < Object.keys(this.nodeList).length - 1; i++) {
      finished = true;
      this.edgeList.forEach((edge) => {
        let thisStep = { node: [edge.fromId, edge.toId], cost: {} } ;
        if (cost[edge.fromId] + edge.weight < cost[edge.toId]) {
          cost[edge.toId] = cost[edge.fromId] + edge.weight;
          thisStep.cost[edge.toId] = cost[edge.toId];
          parents[edge.toId] = edge.fromId;
          finished = false;
        }
        steps.push(thisStep);
      });
      if (finished) {
        break;
      }
    }

    return steps;
  }
}

export default BellmanFordSteps;
