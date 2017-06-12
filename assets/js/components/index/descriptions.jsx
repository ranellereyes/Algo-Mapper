import React from 'react';
import { Link } from 'react-router-dom';

export const AstarDescription = () => (
  <div className='index-description'>
    <h2>A* (A star)</h2>
    <p>A* is an informed search algorithm, or a best-first search, meaning that it solves problems by searching among all possible paths to the solution for the one that incurs the smallest cost. Among the stored paths in memory, it first considers the ones that appear to lead most quickly to the solution. What makes this algorithm unique is its heuristic approach, where each node's cost value is dictated by a heuristic. In general, this cost is evaluated as the sum of the initial cost to reach a particular node, and the distance away that node is from the destination. </p>
    <br />

    <p>Check out this algorithm more in depth <Link to={`/astar`}> here</Link>!</p>
  </div>
)

export const DijkstraDescription = () => (
  <div className='index-description'>
    <h2>Dijkstra's</h2>
    <p>
      Dijkstra's algorithm is an uninformed search algorithm meaning that it will search for the shortest path between a source node and all other nodes. The algorithm presets the cost of reaching all other nodes to infinity because it does not know how much it will cost to reach the next node until it checks the path. Dijkstra's algorithm uses priority queue to greedily select the closest node that has not been visited. Once a node is visited, it will not be visited again. Although a destination node can be set, Dijkstra's algorithm does not attempt to direct its search towards the destination node. Instead, the algorithm expands outward fromt he starting node and finds the shortest path to every node until the destination node is found.
    </p>
    <br />

    <p>Check out this algorithm more in depth <Link to={`/dijkstras`}> here</Link>!</p>
  </div>
)

export const BellmanFordDescription = () => (
  <div className='index-description'>
    <h2>Bellman-Ford</h2>
    <p>
      The Bellman-Ford algorithm is an algorithm that finds the shortest path between a source node and all other nodes in a graph. Unlike Dijkstra's algorithm, the Bellman-Ford algorithm can handle negative edge weights. The algorithm will iterate through every node |V| - 1 times (where V is the number of nodes) to update the shortest path from the source node the all other nodes in the graph. A destination node can be set and the shortest path from the source node to the destination node can be found, but the algorithm does not stop running until all iterations are done or if the current iteration and previous iteration return the same values.
    </p>
    <br />

    <p>Check out this algorithm more in depth <Link to={`/bellman-ford`}> here</Link>!</p>
  </div>
)

export const FloydWarshallDescription = () => (
  <div className='index-description'>
    <h2>Floyd-Warshall</h2>
    <p>
      The Floyd-Warshall algorithm is an algorithm that finds the shortest path between all pairs of node on a given graph. The algorithm creates a cost chart and parent chart initialized with data from each node's direct children. Then the algorithm will iterate through all the nodes to find the shortest for every pair of nodes within the graph. Intermediate nodes are set to the parent node if it lowers the cost of getting from one node to another. A source node and destination node are not chosen in this algorithm but the shortest path can be found using the charts that are created from the algorithm.  
    </p>
    <br />

    <p>Check out this algorithm more in depth <Link to={`/floyd-warshall`}> here</Link>!</p>
  </div>
)
