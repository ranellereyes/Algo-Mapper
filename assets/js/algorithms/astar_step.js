import Astar from './astar';
import { merge } from 'lodash';
import Visualization from '../d3/visualization';

class AstarStep extends Astar {
  constructor(nodeList, startNodeId, endNodeId, visual) {
    super(nodeList);
    this.visualization = visual;
    this.i = 0;
    this.steps = this.search(startNodeId, endNodeId);
    this.nextStep = 'highlight node';
  }

  search(startNodeId, endNodeId) {
    let list = merge({}, this.nodeList);
    let endNode = list[endNodeId];
    let startNode = list[startNodeId];

    for (let idx in list) {
      list[idx].f = 0;
      list[idx].g = 0;
      list[idx].h = 0;
      list[idx].parent = undefined;
    }

    startNode.f = this.hcost(startNode, endNode);
    startNode.h = this.hcost(startNode, endNode);
    let steps = [];

    this.openList.push(startNode);

    while (this.openList.length > 0) {
      let lowIdx = 0;

      for (var i = 0; i < this.openList.length; i++) {
        if (this.openList[i].f < this.openList[lowIdx].f) { lowIdx = i }
      }
      let currentNode = this.openList[lowIdx];

      let newPath = [];
      let curr = currentNode;
      while (curr.parent) {
        newPath.push([curr.parent.id, curr.id]);
        curr = curr.parent;
      }

      let closeList = [];
      this.closeList.forEach( node => closeList.push(node.id));
      this.closeList.push(this.openList.splice(lowIdx)[0]);

      let newStep = {
        currentNode: merge({}, currentNode),
        closeList: closeList,
        path: newPath.reverse(),
        f: currentNode.f,
        g: currentNode.g,
        h: currentNode.h
      }
      steps.push(newStep);

      if (currentNode.id === endNode.id) return steps;

      currentNode.children.forEach( node => {
        list[node.id].g = currentNode.g + node.weight;
        list[node.id].h = this.hcost(list[node.id], list[endNodeId]);
        list[node.id].f = list[node.id].g + list[node.id].h;
      });

      this.childNodes(currentNode).forEach( node => {
        debugger;
        let newNode = list[node.id];
        currentNode.children.find( n => n.id === node.id);
        let gScore = currentNode.g + newNode.g;

        if (!this.openList.includes(node)) {
          this.openList.push(node);
          list[node.id].parent = currentNode;
          list[node.id].g = gScore;
          list[node.id].f = list[node.id].g + list[node.id].h;

        } else if (gScore < list[node.id].g) {
          list[node.id].parent = currentNode;
          list[node.id].g = gScore;
          list[node.id].f = list[node.id].g + list[node.id].h;
        }
      });
    }
    return steps;
  }

  stepForward() {
    if (this.i >= this.steps.length) return;
    let node = this.steps[this.i];
    let visual = this.visualization;
    d3.selectAll('line.link')
      .transition()
      .duration(500)
      .style('stroke', 'grey');
    visual.highlightNode(node.currentNode.id, "green");
    visual.removeText(node.currentNode.id);
    visual.addText(node.currentNode.id, -19, -55, 'blue', (d) => `h = ${Math.floor(node.h)}`);
    visual.addText(node.currentNode.id, -19, -42, 'blue', (d) => `g = ${Math.floor(node.g)}`);
    visual.addText(node.currentNode.id, -19, -25, 'blue', (d) => `f = ${Math.floor(node.f)}`);
    node.path.forEach( link => {
      visual.highlightLink(link[0], link[1], "blue");
    })
    if (node.currentNode.parent) {
      // visual.removeText(node.parent.id);
      visual.highlightNode(node.currentNode.parent.id, "red");
      visual.highlightLink(node.currentNode.parent.id, node.currentNode.id, "red");
    }
    // node.closeList.forEach( id => visual.highlightNode(id, "red"));
    this.i += 1;
  }

  stepBackward() {
    if (this.i <= 0) return;
    this.i -= 1;
    let node = this.steps[this.i];
    let visual = this.visualization;
    visual.unhighlightNode(node.id);
    visual.removeText(node.id);
    if (node.parent) {
      visual.addText(node.parent.id, -19, -55, 'blue', (d) => `h = ${Math.floor(d.h)}`);
      visual.addText(node.parent.id, -19, -42, 'blue', (d) => `g = ${Math.floor(d.g)}`);
      visual.addText(node.parent.id, -19, -25, 'blue', (d) => `f = ${Math.floor(d.f)}`);
      visual.unhighlightLink(node.parent.id, node.id);
    }
  }
}

export default AstarStep;
