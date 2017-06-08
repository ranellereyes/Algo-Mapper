Description

How it works

Greedily finds the distance from source node to all other nodes
1. Assign a source node and set its distance value (cost / weight?) to 0. All other nodes’ distance value to infinity.
2. Set source node to current node and mark all other nodes as unvisited.
3. Find all unvisited neighbors (children) of current node and calculate the tentative distances. If the tentative distance is less than the node’s distance, set distance to the tentative distance
	- Ex. Node A has cost of 0 and the cost to get to Node B is 2.
	- Tentative distance from Node A to B is 0 + 2 = 2 which is less than infinity. Cost to get from node A to B is 2.
4. After the current node checks all of its unvisited neighbors, mark the current node as visited. (Visited nodes will never be checked again)
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
O(V^2)
// double check, not sure if these include binary heap or fibonacci heap

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
