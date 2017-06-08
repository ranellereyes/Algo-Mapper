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
