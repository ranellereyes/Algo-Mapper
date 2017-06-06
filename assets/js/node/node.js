class Node {
  constructor(parentId, childId, weight, x, y) {
    this.parentId = parentId;
    this.childId = childId;
    this.weight = weight;
    this.x = x;
    this.y = y;
  }
}

const NODELIST = {
  1: new Node(undefined)
}
