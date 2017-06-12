import BellmanFord from './bellman_ford';
import { merge } from 'lodash';

class BellmanFordSteps extends BellmanFord{
  constructor(nodeList, startNodeId, endNodeId, visual) {
    super(nodeList);
    // this.nodeList = nodeList;
    this.visual = visual;
    this.index = -1;
    this.path = super.search(startNodeId, endNodeId).path;
    this.edgeList = this.createEdgeList(nodeList);

    this.search = this.search.bind(this);
    this.stepBackward = this.stepBackward.bind(this);
    this.stepForward = this.stepForward.bind(this);

    this.steps= this.search(startNodeId, endNodeId);
  }

  search(startNodeId, endNodeId) {
    let costs = {};
    let parents = {};

    Object.keys(this.nodeList).forEach((nodeId) => {
      costs[nodeId] = Infinity;
      parents[nodeId] = null;
    });
    costs[startNodeId] = 0;

    let steps = [merge({},{
                  node: [null, String(startNodeId)],
                  costs: costs})];

    let finished = false;

    for (let i = 0; i < Object.keys(this.nodeList).length - 1; i++) {
      finished = true;
      this.edgeList.forEach((edge) => {
        let thisStep = merge({},{
                      node: [edge.fromId, edge.toId],
                      costs: costs});
        // let thisStep = { node: [edge.fromId, edge.toId], costs } ;
        if (costs[edge.fromId] + edge.weight < costs[edge.toId]) {
          costs[edge.toId] = costs[edge.fromId] + edge.weight;
          thisStep.costs[edge.toId] = costs[edge.toId];
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
    this.index--;
    this.visual.clearLinks();
    this.visual.clearNodes();
    if (this.index < 0) {
      this.index = -1;
    } else {
      this.visual.highlightNode(this.steps[this.index].node[0], "yellow");
      this.visual.highlightNode(this.steps[this.index].node[1], "green");
      this.visual.highlightLink(this.steps[this.index].node[0], this.steps[this.index].node[1], "red");

      let costs = this.steps[this.index].costs;
      Object.keys(costs).forEach((nodeId) => {
        this.visual.removeText(nodeId);
        if (costs[nodeId] === Infinity) {
          this.visual.addText(nodeId, -6, -25, "red", (d) => "∞");
        } else if (costs[nodeId] < 10 && costs[nodeId] >= 0) {
          this.visual.addText(nodeId, -5, -28, "red", (d) => costs[nodeId]);
        } else {
          this.visual.addText(nodeId, -7, -28, "red", (d) => costs[nodeId]);
        }
      });
    }
  }

  stepForward() {
    this.index++;
    this.visual.clearLinks();
    this.visual.clearNodes();
    if (this.index >= this.steps.length ) {
      this.path.forEach((id) => {
        this.visual.highlightNode(id, "red");
      });
      for (let i = 0; i < this.path.length -1; i++) {
        this.visual.highlightLink(this.path[i], this.path[i+1], "red");
      }
      this.index = this.steps.length;
    } else {
      this.visual.highlightNode(this.steps[this.index].node[0], "yellow");
      this.visual.highlightNode(this.steps[this.index].node[1], "green");
      this.visual.highlightLink(this.steps[this.index].node[0], this.steps[this.index].node[1], "red");

      let costs = this.steps[this.index].costs;
      Object.keys(costs).forEach((nodeId) => {
        this.visual.removeText(nodeId);
        if (costs[nodeId] === Infinity) {
          this.visual.addText(nodeId, -6, -25, "red", (d) => "∞");
        } else if (costs[nodeId] < 10 && costs[nodeId] >= 0) {
          this.visual.addText(nodeId, -5, -28, "red", (d) => costs[nodeId]);
        } else {
          this.visual.addText(nodeId, -7, -28, "red", (d) => costs[nodeId]);
        }
      });
    }
  }

  stepForwardDisplay() {
    this.index++;
    this.visual.clearLinks();
    this.visual.clearNodes();
    if (this.index >= this.steps.length ) {
      this.path.forEach((id) => {
        this.visual.highlightNode(id, "red");
      });
      for (let i = 0; i < this.path.length -1; i++) {
        this.visual.highlightLink(this.path[i], this.path[i+1], "red");
      }
      this.index = -1;
    } else {
      this.visual.highlightNode(this.steps[this.index].node[0], "yellow");
      this.visual.highlightNode(this.steps[this.index].node[1], "green");
      this.visual.highlightLink(this.steps[this.index].node[0], this.steps[this.index].node[1], "red");
    }
  }

  display() {
    return setInterval(() => this.stepForwardDisplay(), 1500);
  }
}

export default BellmanFordSteps;
