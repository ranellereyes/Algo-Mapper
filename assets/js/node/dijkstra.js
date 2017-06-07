class Dijkstra {
  constructor(nodeList, source, destination) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.source = this.nodeList[1]; // nodeList[#]
    this.destination = destination; // nodeList[#]
  }

  initiate(source) {
    this.source.weight = 0;
    this.source.cost = 0;
    this.unvisited.push(this.source);
    Object.keys(this.nodeList).forEach(id => {
      let node = this.nodeList[id];
      if (node !== this.source) {
        node.cost = Infinity;
        this.unvisited.push(node)
      }
    });
  }

  search(source, destination) {
    let parent = {};
    let node = source;
    let lowestCost;
    while (this.unvisited.length !== 0) {
      node.children.forEach(child => {
        let _node;
        if (this.unvisited.indexOf(this.nodeList[child.id]) !== -1) {
          _node = this.nodeList[child.id]
          if (_node.cost > node.cost + child.weight) {
            _node.cost = node.cost + child.weight;
            parent[_node.id] = node.id;
          }
          _node.cost = node.cost + child.weight
          // debugger
        }
        // if (_node && ) {
        //
        // }
        // else if (_node) {
        //   // console.log(_node, _node.cost);
        //   lowestCost = lowestCost < _node.cost ? lowestCost : child;
        //   parent[_node.id] = node.id;
        // }
      });
      this.visited.push(node);
      this.unvisited.splice(this.unvisited.indexOf(node), 1);
      node = this.unvisited[0]
      for (let i = 1; i < this.unvisited.length; i++) {
        if (this.unvisited[i].cost < node.cost) {
          node = this.unvisited[i]
        }
      }

      lowestCost = undefined;
    }
    console.log(parent);
    this.createPath(parent, source, destination);
  }

  createPath(parent, source, destination) {
    let path = [destination.id];
    let startKey = destination.id;
    while (parent[startKey]) {
      path.push(parent[startKey]);
      startKey = parent[startKey]
    }
    console.log(path.reverse());
    return path.reverse();
  }


}

export default Dijkstra;
