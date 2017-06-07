class Dijkstra {
  constructor(nodeList, source, destination) {
    this.nodeList = nodeList;
    this.visited = [];
    this.unvisited = [];
    this.source = source || this.nodeList[1]; // nodeList[#]
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
    while (this.unvisited.length !== 0) {
      node.children.sort((a,b) => a.weight - b.weight).forEach(child => {
        let _node;
        if (this.unvisited.indexOf(this.nodeList[child.id]) !== -1) {
          _node = this.nodeList[child.id];
          if (_node.cost > node.cost + child.weight) {
            _node.cost = node.cost + child.weight;
            parent[_node.id] = node.id;
          }
          _node.cost = node.cost + child.weight
        }
      });
      // adds node to visited list
      this.visited.push(node);
      // remove node from unvisited list
      this.unvisited.splice(this.unvisited.indexOf(node), 1);


      //choose node with lowest cost
      node = this.unvisited[0]
      for (let i = 1; i < this.unvisited.length; i++) {
        if (this.unvisited[i].cost < node.cost) {
          node = this.unvisited[i]
        }
      }
    }
    // create path from source to destination
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
