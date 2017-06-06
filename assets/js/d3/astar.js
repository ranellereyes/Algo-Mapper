class AstarVisualization {
  constructor(nodeList) {
    this.nodeList = nodeList;
  }

  parseNodes() {
    let nodes = [];
    let keys = Object.keys(this.nodeList).sort();
    keys.forEach( idx => {
      this.nodeList[idx].fx = this.nodeList[idx].x;
      this.nodeList[idx].fy = this.nodeList[idx].y;
      nodes.push(this.nodeList[idx]);
    });

    let links = [];
    nodes.forEach( (node, idx) => {
      node.children.forEach( child => {
        links.push({ source: idx + 1, target: child.id + 1 })
      });
    });
    let graph = { nodes: nodes, links: links};
    return graph;
  }

  draw() {
    //Constants for the SVG
    var width = 500,
        height = 500;

    //Set up the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    //Set up the force layout
    var force = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.index }))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0));

    //Append a SVG to the body of the html page. Assign this SVG as an object to svg
    var svg = d3.select("main").append("svg")
        .attr("width", width)
        .attr("height", height);

    //Read the data from the mis element
    // var mis = document.getElementById('mis').innerHTML;
    let graph = this.parseNodes();

    //Creates the graph data structure out of the json data
    // force.nodes(graph.nodes)
    //     .links(graph.links)
    //     .start();

    //Create all the line svgs but without locations yet
    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", 2);

    //Do the same with the circles for the nodes - no
    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 8)
        .style("fill", color(5));


    //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
    force.on("end", function () {
        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
            return d.source.y;
        })
            .attr("x2", function (d) {
            return d.target.x;
        })
            .attr("y2", function (d) {
            return d.target.y;
        });

        node.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
            return d.y;
        });
    });
  }
}

export default AstarVisualization;
