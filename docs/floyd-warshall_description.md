Floyd-Warshall

Description

How does it work
Finds shortest path from all pairs of nodes
1. Creates a cost and parent chart, initialized with data from direct children
2. Iterate through every pair of nodes with a intermediate node to pass through
3. Check if path the intermediate is less of a cost than the direct path, if so, replace parents with parent of intermediate-to node
- Ex. Imagine A to C is cost of 15
- Cost of A to B is 4 and cost of B to C is 5
- Cost of A - B - C is less than A - C, thus, A - C’s parent is now B
4. After algorithm is finished, use parental path to retrace the shortest path from a pair of nodes



Pros
- Finds shortest path for every pair of nodes
- Preloads entire nest
- Checks for negative edges
- Same best and worst time complexity

Cons
- Slow (O(v^3) time complexity)
- Cannot end iterations early
- Requires O(v^3) space complexity
- Will have to redo calculations if new node is added


Time Complexity
Best
O(v^3)
Worst
O(v^3)

Math

Pseudo Code

```
 let dist be a |V| × |V| array of minimum distances initialized to ∞ (infinity)
 for each vertex v
    dist[v][v] ← 0
 for each edge (u,v)
    dist[u][v] ← w(u,v)  // the weight of the edge (u,v)
 for k from 1 to |V|
    for i from 1 to |V|
       for j from 1 to |V|
          if dist[i][j] > dist[i][k] + dist[k][j]
             dist[i][j] ← dist[i][k] + dist[k][j]
         end if
```
