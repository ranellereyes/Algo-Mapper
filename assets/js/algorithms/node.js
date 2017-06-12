export class Node {
  constructor(children, id, x, y) {
    this.children = children;
    this.x = x || this.randomDist(id);
    this.y = y || this.randomDist(id);
    this.id = id;
  }

  randomDist(n) {
    (10 * n) + Math.floor((10 * n) * Math.random());
  }
}

export const NODELIST = {
  1: new Node([{ id: 2, weight: 3 }, { id: 3, weight: 5 }], 1, 75, 250),
  2: new Node([{ id: 5, weight: 8 }], 2, 175, 150),
  3: new Node([{ id: 5, weight: 5 }, { id: 4, weight: 1 }], 3, 175, 350),
  4: new Node([{ id: 6, weight: 9 }], 4, 325, 350),
  5: new Node([{ id: 6, weight: 2 }], 5, 325, 150),
  6: new Node([{}], 6, 425, 250)
};

export const NODELIST2 = {
  1: new Node([
    { id: 2, weight: 11 },
    { id: 4, weight: 9 },
    { id: 5, weight: 8 },
  ], 1, 75, 280),
  2: new Node([{ id: 3, weight: 2 }, { id: 7, weight: 8 }], 2, 165, 380),
  3: new Node([{ id: 7, weight: 4 }], 3, 295, 360),
  4: new Node([
    { id: 5, weight: 2 },
    { id: 6, weight: 12 },
    { id: 2, weight: 1 },
  ], 4, 210, 255),
  5: new Node([{ id: 6, weight: 10 }], 5, 130, 150),
  6: new Node([{ id: 8, weight: 9 }], 6, 260, 125),
  7: new Node([{ id: 4, weight: 12 }, { id: 8, weight: 5 }], 7, 350, 225),
  8: new Node([], 8, 405, 100)
};

export class nodelistGenerator {
  constructor(n) {
    this.nodelist = {};
    this.max = n;

    for (var i = 1; i <= n; i++) {
      this.nodelist[i] = new Node(this.randomChildren(i), i);
    }

  }

  randomWt() {
    return Math.floor(15 * Math.random());
  }

  randomChildren(n) {
    // Limit amount of possible children to 1-3
    let numOfChildren = 1 + Math.floor(3 * Math.random()),
        family = [];

    // Generate children up to 4 nodes away, no repeats
    while (family.length < numOfChildren) {
      // Generates random child, checks if child already made
      let childId = n + 1 + Math.floor(2 * Math.random());
      while (family.map(e => Number(e.id)).includes(childId)) {
        childId = n + 1 + Math.floor(4 * Math.random());
      }

      family.push({id: childId, weight: this.randomWt()});
    }

    // Filters out non-existant nodes
    family = family.filter(node => Number(node.id) <= this.max);

    // If node has all children filtered out, give it adjacent node
    // Check if node is last node
    if (family.length === 0 && n !== this.max) {
      family.push({id: n + 1, weight: this.randomWt()});
    }

    return family;
  }
}
