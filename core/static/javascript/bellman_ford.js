class BellmanFord {
  constructor(nodeList) {
    this.nodeList = nodeList;
    // make edge list to lterate every every edge
    this.edgeList = this.createEdgeList(nodeList);
    this.search = this.search.bind(this);
  }
  search(startNodeId, endNodeId) {
    let cost = {};
    let parents = {};
    // initailize every cost to infinity
    Object.keys(this.nodeList).forEach((nodeId) => {
      cost[nodeId] = Infinity;
      parents[nodeId] = null;
    });
    // set the source node to source node cost to 0
    cost[startNodeId] = 0;
    let finished = false;
    // (count of Node) -1 times iterate
    for (let i = 0; i < Object.keys(this.nodeList).length -1; i++) {
      // keep checking shorted path until every node cost will be updated
      finished = true;
      this.edgeList.forEach((edge) => {
        if (cost[edge.fromId] + edge.weight < cost[edge.toId]) {
          // if the shorter path is found, node cost will be updated
          cost[edge.toId] = cost[edge.fromId] + edge.weight;
          parents[edge.toId] = edge.fromId;
          finished = false;
        }
      });
      if (finished) {
        break;
      }
    }
    return this.createPath(parents, startNodeId, endNodeId);
  }
  createEdgeList(nodeList) {
    let edges = [];
    Object.keys(nodeList).forEach((nodeId) => {
      nodeList[nodeId].children.forEach((child) => {
        edges.push({ fromId: nodeId, toId: String(child.id), weight: child.weight});
      });
    });
    return edges;
  }
  createPath (parents, startNodeId, endNodeId) {
    let path = [String(endNodeId)];
    let startKey = endNodeId;
    while (parents[startKey]) {
      path.push(parents[startKey]);
      startKey = parents[startKey];
    }
    return path.reverse();
  }
}
export default BellmanFord;
