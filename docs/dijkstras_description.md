Description

How it works
Breadth-first search
Greedily finds the cost from a source node to a destination node or all other nodes within a graph that does not contain negative edge path costs.
//cost is how much it takes to get from one node to another
1. Assign a source node and set its cost to 0. All other nodes’ cost is set to infinity.
2. Set source node to current node and mark all other nodes as unvisited.
3. Find all unvisited neighbors (children) of current node and calculates the tentative costs. If the tentative cost is less than the node’s current cost, set cost to the tentative cost.
	- Ex. Node A (current node) has cost of 0 and the edge weight to get to Node B is 2.
	- The tentative cost from Node A to B is 0 + 2 = 2 which is less than infinity. The cost to get from node A to B is now 2.
4. After the current node checks all of its unvisited neighbors, mark the current node as visited. Visited nodes will never be checked again.
5. If all nodes have been visited or the destination node has been visited, the algorithm is finished and stops, else the current node is set to the node with the lowest cost and go back to step 3.


Pros:
- Uniformed algorithm. Does not need to know destination beforehand
- Useful when trying to find multiple destinations as Dijkstras provides the shortest path from one source to all other destinations

Cons:
- Fails with negative edge weights because visited nodes will never be visited again so the costs will never be re-evaluated

Time Complexity
Best:
E: Edge
V: Vertices
O(E logV)
Worst:
O(V^2) if binary heap or fibonacci heap is not applied

Math

Pseudo code

```
function Dijkstra(Graph, source):

  create vertex set Q

   for each vertex v in Graph:             // Initialization
       dist[v] ← INFINITY           // Unknown distance from source to v
       prev[v] ← UNDEFINED  // Previous node in optimal path from source
       add v to Q             // All nodes initially in Q (unvisited nodes)

      dist[source] ← 0                   // Distance from source to source

      while Q is not empty:
          u ← vertex in Q with min dist[u]    // Node with the least distance will be selected first
          remove u from Q

          for each neighbor v of u:        // where v is still in Q.
              alt ← dist[u] + length(u, v)
              if alt < dist[v]:        // A shorter path to v has been found
                  dist[v] ← alt
                  prev[v] ← u

      return dist[], prev[]
```
