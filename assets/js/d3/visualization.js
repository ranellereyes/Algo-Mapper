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
        links.push({ source: node, target: list[child.id], weight: child.weight })
      });
    });
    let graph = { nodes: nodes, links: links };
    return graph;
  }

  centerTextX(x1, x2, y1, y2) {
    let x = (x1 + x2) / 2;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let radians = Math.atan(dy/dx);
    if (Math.cos(radians) === 0) return x + 10;
    if ((dy > 0 && dx > 0) || (dy < 0 && dx > 0)) {
      return x + Math.cos(radians) * 10;
    }
    return x - Math.cos(radians) * 10;
  }

  centerTextY(x1, x2, y1, y2) {
    let y = (y1 + y2) / 2;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let radians = Math.atan(dy/dx);
    if (Math.sin(radians) === 0) return y + 10;
    if ((dy > 0 && dx > 0) || (dy < 0 && dx > 0)) {
      return y - Math.sin(radians) * 10;
    }
    return y + Math.sin(radians) * 10;
  }

  draw() {
    let color = d3.scaleOrdinal(d3.schemeCategory20);
    let graph = this.parseNodes();

    this.svg = d3.select("div.visualization").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    this.svg.append("defs").selectAll("marker")
        .data(["base", "color", "color2"])
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
    this.colorPath2 = d3.select('marker#color2 path');

    this.nodeGroup = this.svg.selectAll("g")
      .data(graph.nodes);

    this.links = this.svg.selectAll("line.link")
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

    this.svg.selectAll("text.link")
        .data(graph.links)
        .enter().append("text")
        .attr("class", "link")
        .attr("x", (d) => this.centerTextX(d.source.x, d.target.x, d.source.y, d.target.y))
        .attr("y", (d) => this.centerTextY(d.source.x, d.target.x, d.source.y, d.target.y))
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(function(d) { return d.weight });


    this.nodeWrapper = this.nodeGroup
        .enter().append("g")
        // .attr("transform", function(d) { return `translate(${d.x},${d.y})` })

    this.nodeWrapper
        .append("circle")
        .attr("class", "node");

    this.nodeText = this.nodeWrapper.append("text")
        .attr("x", function(d) { return d.x })
        .attr("y", function(d) { return d.y })
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(function(d) { return d.id });

    this.nodes = d3.selectAll(".node")
        .attr("r", 20)
        .attr("id", function(d) { return d.id })
        .attr("cx", function(d) { return d.x })
        .attr("cy", function(d) { return d.y })
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

  unhighlightNode(id) {
    d3.select(this.nodes._groups[0][id - 1]).transition().duration(500)
      .style("fill", "lightblue")
      .style("r", 20);
  }

  highlightNode(id, color) {
    d3.select(this.nodes._groups[0][id - 1]).transition().duration(500)
      .style("fill", color)
      .style("r", 22);
  }

  highlightLink(fromId, toId, color) {
    d3.select(this.links._groups[0].find( link => link.id === `${fromId}-${toId}`))
      .style('marker-end', 'url(#color)')
      .style('stroke', color);
    this.colorPath.style('stroke', color).style('fill', color);
  }

  highlightLink2(fromId, toId, color) {
    d3.select(this.links._groups[0].find( link => link.id === `${fromId}-${toId}`))
      .style('marker-end', 'url(#color2)')
      .style('stroke', color);
    this.colorPath.style('stroke', color).style('fill', color);
  }

  changeText(textFunction) {
    this.nodeText.text((d) => textFunction(d));
  }
}

export default Visualization;
