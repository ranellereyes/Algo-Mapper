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

      console.log(this.openList.map( node => node.id ));
      console.log(this.openList.map( node => node.f ));
      console.log(currentNode.id);

      let newPath = [];
      let curr = currentNode;
      while (curr.parent) {
        newPath.push([curr.parent.id, curr.id]);
        curr = curr.parent;
      }

      let closeList = [];
      this.closeList.forEach( node => closeList.push(node.id));
      this.closeList.push(this.openList.splice(lowIdx, 1)[0]);

      let newNode = merge({}, currentNode);
      let newStep = {
        currentNode: newNode,
        closeList: closeList,
        path: newPath.reverse(),
        f: newNode.f,
        g: newNode.g,
        h: newNode.h
      }
      steps.push(newStep);

      if (currentNode.id === endNode.id) {
        return steps;
      }

      currentNode.children.forEach( node => {
        list[node.id].g = currentNode.g + node.weight;
        list[node.id].h = this.hcost(list[node.id], list[endNodeId]);
        list[node.id].f = list[node.id].g + list[node.id].h;
      });

      this.childNodes(currentNode).forEach( node => {
        let gScore = currentNode.g + node.g;

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
    // d3.selectAll('line.link')
    //   .transition()
    //   .duration(500)
    //   .style('stroke', 'grey');
    visual.highlightNode(node.currentNode.id, "green");
    visual.removeText(node.currentNode.id);
    visual.addText(node.currentNode.id, -19, -55, 'blue', (d) => `h = ${Math.floor(node.h)}`);
    visual.addText(node.currentNode.id, -19, -41, 'blue', (d) => `g = ${Math.floor(node.g)}`);
    visual.addText(node.currentNode.id, -19, -25, 'blue', (d) => `f = ${Math.floor(node.f)}`);
    if (node.currentNode.parent) {
      // visual.removeText(node.parent.id);
      visual.highlightNode(node.currentNode.parent.id, "red");
      visual.highlightLink(node.currentNode.parent.id, node.currentNode.id, "red");
    }
    if (this.i === this.steps.length - 1) {
      node.path.forEach( link => {
        visual.highlightLink(link[0], link[1], "blue");
      });
    }
    // node.closeList.forEach( id => visual.highlightNode(id, "red"));
    this.i += 1;
  }

  stepBackward() {
    if (this.i <= 0) return;
    this.i -= 1;
    let node = this.steps[this.i];
    let visual = this.visualization;
    if (this.i === this.steps.length - 1) {
      node.path.forEach( link => {
        visual.highlightLink(link[0], link[1], "red");
      })
    }
    visual.unhighlightNode(node.currentNode.id);
    visual.removeText(node.currentNode.id);
    visual.removeText(node.currentNode.parent.id);
    if (node.currentNode.parent) {
      visual.highlightNode(node.currentNode.parent.id, "green");
      visual.addText(node.currentNode.parent.id, -19, -55, 'blue', (d) => `h = ${Math.floor(node.h)}`);
      visual.addText(node.currentNode.parent.id, -19, -41, 'blue', (d) => `g = ${Math.floor(node.g)}`);
      visual.addText(node.currentNode.parent.id, -19, -25, 'blue', (d) => `f = ${Math.floor(node.f)}`);
      visual.unhighlightLink(node.currentNode.parent.id, node.currentNode.id);
    }
  }
}

export default AstarStep;
