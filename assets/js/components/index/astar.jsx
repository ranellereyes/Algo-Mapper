import React from 'react';

const AstarDescription = () => (
  <div className='index-description'>
    <h2>A* (A star)</h2>
    <p>A* is an informed search algorithm, or a best-first search, meaning that it solves problems by searching among all possible paths to the solution for the one that incurs the smallest cost. Among the stored paths in memory, it first considers the ones that appear to lead most quickly to the solution. What makes this algorithm unique is its heuristic approach, where each node's cost value is dictated by a heuristic. In general, this cost is evaluated as the sum of the initial cost to reach a particular node, and the distance away that node is from the destination. </p>
    <br />
    <p>A* is well-known for its ability to find paths quickly and accurately in real world scenarios. However, for node paths A* may struggle since absolute distance does not always signify the actual cost to reach a point. Furthermore, node paths may diverge up to N - 1 nodes, where N is the number of total nodes.</p>
    <br />
    <p>Check out this algorithm more in depth here!</p>
  </div>
)

export default AstarDescription;
