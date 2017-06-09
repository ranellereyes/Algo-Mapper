A-star

Description

How it works?
Best-first search
Finds the shortest distance from one node to another node
1. Requires source node and destination node to work and adds source node to a closed list
2. Calculates the cost of the all adjacent nodes to the source node by adding the edge weight of going to the node and its heuristic (distance from adjacent node to destination node) //maybe more clear explanation needed
	- Ex. f(n) = g(n) + h(n) //f = cost, g=weight, h=heuristic
	- Going from node A to node B, the edge weight is 5 and heuristic is 9
	- Cost = 5 + 9 = 14
	- Cost of going from node A to node B is 14
3. The source node chooses the adjacent node with the lowest cost to reach, adds the chosen adjacent node to the closed list, and adds other adjacent nodes to open list
4. The adjacent node (the new current node), will calculate the cost of it’s adjacent nodes and choose the node with the lowest cost. The chosen adjacent node is added the closed list and the other adjacent nodes will be added to the open list
5. Repeat step 4 until destination is reached
6. //add and edit anything you want


Pros
- Generally very fast
- It will always find a solution if it exists
- Best algorithm for path finding, but may not be best for shortest path
- Time complexity is mostly O(n)

Cons
- Not optimized for node maps (inefficient if there are a lot of connections between node to node)
- Will not always find shortest path depending on heuristics



Time Complexity
Best
O(n)
Worst
O(n^n)

Math

Pseudo Code
```
function A*(start, goal)
    // The set of nodes already evaluated
    closedSet := {}

    // The set of currently discovered nodes that are not evaluated yet.
    // Initially, only the start node is known.
    openSet := {start}

    // For each node, which node it can most efficiently be reached from.
    // If a node can be reached from many nodes, cameFrom will eventually contain the
    // most efficient previous step.
    cameFrom := the empty map

    // For each node, the cost of getting from the start node to that node.
    gScore := map with default value of Infinity

    // The cost of going from start to start is zero.
    gScore[start] := 0

    // For each node, the total cost of getting from the start node to the goal
    // by passing by that node. That value is partly known, partly heuristic.
    fScore := map with default value of Infinity

    // For the first node, that value is completely heuristic.
    fScore[start] := heuristic_cost_estimate(start, goal)

    while openSet is not empty
        current := the node in openSet having the lowest fScore[] value
        if current = goal
            return reconstruct_path(cameFrom, current)

        openSet.Remove(current)
        closedSet.Add(current)

        for each neighbor of current
            if neighbor in closedSet
                continue		// Ignore the neighbor which is already evaluated.

            if neighbor not in openSet	// Discover a new node
                openSet.Add(neighbor)

            // The distance from start to a neighbor
            tentative_gScore := gScore[current] + dist_between(current, neighbor)
            else if tentative_gScore >= gScore[neighbor]
                continue		// This is not a better path.

            // This path is the best until now. Record it!
            cameFrom[neighbor] := current
            gScore[neighbor] := tentative_gScore
            fScore[neighbor] := gScore[neighbor] + heuristic_cost_estimate(neighbor, goal)

    return failure

function reconstruct_path(cameFrom, current)
    total_path := [current]
    while current in cameFrom.Keys:
        current := cameFrom[current]
        total_path.append(current)
    return total_path
```
