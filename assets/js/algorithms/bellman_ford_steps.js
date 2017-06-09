import BellmanFord from './bellman_ford';
import { merge } from 'lodash';

class BellmanFordSteps extends BellmanFord{
  constructor(nodeList, startNodeId, endNodeId, visual) {
    super(nodeList);
    this.nodeList = nodeList;
    this.visual = visual;
    this.index = -1;
    this.path = super.search(startNodeId, endNodeId);
    this.edgeList = this.createEdgeList(nodeList);

    this.search = this.search.bind(this);
    this.stepBackward = this.stepBackward.bind(this);
    this.stepForward = this.stepForward.bind(this);

    this.steps= this.search(startNodeId, endNodeId);
  }

  search(startNodeId, endNodeId) {
    let cost = {};
    let parents = {};

    Object.keys(this.nodeList).forEach((nodeId) => {
      cost[nodeId] = Infinity;
      parents[nodeId] = null;
    });

    let steps = [merge({},{
                  node: [null, String(startNodeId)],
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

  stepBackward() {
    console.log(this.index);
    this.index--;
    if (this.index < 0) {
      this.index = 0;
    } else if (this.index === this.steps.length -1){
      this.path.forEach((id) => {
        this.visual.unhighlightNode(id);
      });
    }
    else {
      this.visual.unhighlightNode(this.steps[this.index+1].node[0]);
      this.visual.unhighlightNode(this.steps[this.index+1].node[1]);

      this.visual.highlightNode(this.steps[this.index].node[0], "red");
      this.visual.highlightNode(this.steps[this.index].node[1], "green");
    }

  }

  stepForward() {
    console.log(this.index);
    this.index++;
    if (this.index === this.steps.length ) {
      this.path.forEach((id) => {
        this.visual.highlightNode(id, "red");
      });
      this.index = this.steps.length - 1;
    } else if (this.index === 0) {
      this.visual.highlightNode(this.steps[this.index].node[0], "red");
      this.visual.highlightNode(this.steps[this.index].node[1], "green");
    } else {
      this.visual.unhighlightNode(this.steps[this.index-1].node[0]);
      this.visual.unhighlightNode(this.steps[this.index-1].node[1]);

      this.visual.highlightNode(this.steps[this.index].node[0], "red");
      this.visual.highlightNode(this.steps[this.index].node[1], "green");
    }
  }
}

export default BellmanFordSteps;
