class AstarVisualization {
  constructor(nodeList) {
    this.nodeList = nodeList;
  }

  parseNodes() {
    let nodes = [];
    let list = this.nodeList;
    let keys = Object.keys(list).sort();
    keys.forEach( idx => {
      // list[idx].index = parseInt(idx);
      nodes.push(list[idx]);
    });

    let links = [];
    nodes.forEach( (node, idx) => {
      node.children.forEach( child => {
        if (!child.id) return;
        links.push({ source: node, target: list[child.id] })
      });
    });
    let graph = { nodes: nodes, links: links };
    return graph;
  }

  draw() {
    let color = d3.scaleOrdinal(d3.schemeCategory20);
    let graph = this.parseNodes();

    this.svg = d3.select("main").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    this.svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
        .enter().append("marker")
        .attr("id", function(d) { return d })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
        .style("stroke", "white")
        .style("opacity", "1");

    this.links = this.svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke", "white")
        .attr("class", "link")
        .style("stroke-width", 1)
        .style("marker-end",  "url(#suit)");

    this.nodes = this.svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 8)
        .style("fill", color(5))
        .style("stroke", "lightgray")
        .style("stroke-width", 1)

    this.force = d3.forceSimulation();
        // .force("link", d3.forceLink().id(function(d) { return d.id }));

    let render = () => {
      this.links
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      this.nodes
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    }

    // this.force.nodes(graph.nodes);

    // force
    //   .force("link")
    //   .links(graph.links);

    this.force.on("tick", render);

  }

  highlightNode(id) {
    d3.select(this.nodes._groups[0][id - 1]).style("fill", "red");
  }
}

export default AstarVisualization;
