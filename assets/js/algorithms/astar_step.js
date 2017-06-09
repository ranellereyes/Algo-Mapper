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
    let steps = [];

    // define f, g, and h cost
    for (let idx in list) {
      list[idx].f = 0;
      list[idx].g = 0;
      list[idx].h = 0;
      list[idx].parent = undefined;
    }

    startNode.f = this.hcost(startNode, endNode);
    startNode.h = this.hcost(startNode, endNode);

    // add starting node to open list
    this.openList.push(startNode);

    // run pathfinding until open list is empty
    while (this.openList.length > 0) {
      let lowIdx = 0;

      // find lowest node in open list with the lowest f cost
      for (var i = 0; i < this.openList.length; i++) {
        if (this.openList[i].f < this.openList[lowIdx].f) { lowIdx = i }
      }
      let currentNode = this.openList[lowIdx];
      steps.push(merge({}, currentNode));
      // return path if current node is the end node
      if (currentNode.id === endNode.id) {
        // let curr = currentNode;
        // let path = [];
        // while (curr.parent) {
        //   path.push(curr.id);
        //   curr = curr.parent;
        // }
        // path.push(curr.id);
        // return path.reverse();
        return steps;
      }

      // calculate f, g, and h cost for each child node of the current node
      currentNode.children.forEach( node => {
        list[node.id].g = currentNode.g + node.weight;
        list[node.id].h = this.hcost(list[node.id], list[endNodeId]);
        list[node.id].f = list[node.id].g + list[node.id].h;
      });

      // add current node to close list and remove it from the open list
      this.closeList.push(this.openList.splice(lowIdx));

      this.childNodes(currentNode).forEach( node => {
        // let node = list[node.id];
        // currentNode.children.find( n => n.id === node.id);
        let gScore = currentNode.g + node.g;

        // add new child node to open list if not included
        if (!this.openList.includes(node)) {
          this.openList.push(node);
          list[node.id].parent = currentNode;
          list[node.id].g = gScore;
          list[node.id].f = list[node.id].g + list[node.id].h;

        // update existing node if g cost is lower in newly found path
        } else if (gScore < list[node.id].g) {
          list[node.id].parent = currentNode;
          list[node.id].g = gScore;
          list[node.id].f = list[node.id].g + list[node.id].h;
        }
      });
      // this.openList.forEach( node => {
      //   steps.push(merge({}, node));
      // });
    }
    return steps;
  }

  stepForward() {
    let node = this.steps[this.i];
    let visual = this.visualization;
    debugger;
    visual.highlightNode(node.id, "red");
    if (node.parent) {
      visual.highlightLink(node.parent.id, node.id, "red");
    }
    // node.children.forEach( child => {
    //   visual.highlightLink(node.id, child.id, "red");
    // });
    this.i += 1;
  }
}

export default AstarStep;
