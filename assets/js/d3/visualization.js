class Visualization {
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

    this.svg = d3.select("div.visualization").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    this.svg.append("defs").selectAll("marker")
        .data(["base", "color"])
        .enter().append("marker")
        .attr("id", function(d) { return d })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 26)
        .attr("refY", 0)
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .style("fill", "gray")
        .style("stroke", "gray")
        .style("opacity", "1");

    this.basePath = d3.select('marker#base path');
    this.colorPath = d3.select('marker#color path');

    this.links = this.svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke", "gray")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr("id", function(d) { return `${d.source.id}-${d.target.id}`})
        .style("stroke-width", 3)
        .style("marker-end",  "url(#base)");

    this.nodeGroup = this.svg.selectAll("g")
      .data(graph.nodes);

    this.nodeWrapper = this.nodeGroup
        .enter().append("g")
        .attr("transform", function(d) { return `translate(${d.x},${d.y})` })

    this.nodeWrapper
        .append("circle")
        .attr("class", "node");

    this.nodeWrapper.append("text")
        .attr("dx", function(d) { return -4 })
        .attr("dy", function(d) { return 5 })
        .text(function(d) { return d.id });

    this.nodes = d3.selectAll(".node")
        .attr("r", 20)
        .attr("id", function(d) { return d.id })
        .style("fill", "LightBlue")
        .style("stroke", "black")
        .style("stroke-width", 2);

    // let render = () => {
    //   this.links
    //     .attr("x1", function(d) { return d.source.x; })
    //     .attr("y1", function(d) { return d.source.y; })
    //     .attr("x2", function(d) { return d.target.x; })
    //     .attr("y2", function(d) { return d.target.y; })
    // }

    // this.force = d3.forceSimulation()
    // this.force.on("tick", render);
  }

  highlightNode(id, color) {
    d3.select(this.nodes._groups[0][id - 1]).style("fill", color);
  }

  highlightLink(fromId, toId, color) {
    d3.select(this.links._groups[0].find( link => link.id === `${fromId}-${toId}`))
      .style('marker-end', 'url(#color)')
      .style('stroke', color);
    this.colorPath.style('stroke', color).style('fill', color);
  }
}

export default Visualization;
