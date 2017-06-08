Bellman-Ford

Description

How it works
Finds distance from source node to all other nodes //needs change
1. Assign a source node and set its distance value (cost / weight?) to 0. All other nodes’ distance value to infinity. //Anything else?
2. From the source node it relaxes all the edges in the graph that are outgoing from the source node.
3. Iterate over every node V-1 times (V = # of vertices) and updates the cost of getting from source node to every node if the cost is less than the previous cost of getting to the node //wordy and shitty
4. The algorithm ends when it iterates over the nodes V-1 times or if the current and previous iteration is the same.
5. //need to add something about negative cycles?
6. //Anything else to include??

Pros
- Accounts for negative weights
- Not greedy
- Allows for a wider class of inputs than Dijkstra

Cons
-

Time Complexity
Best
O(E) or O(n)
Worst
O((V-1) * E) or O(n^2)
