d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
      var firstChild = this.parentNode.firstChild;
      if (firstChild) {
          this.parentNode.insertBefore(this, firstChild);
      }
  });
};

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

  centerTextX(x1, x2, y1, y2, weight) {
    let x = (x1 + x2) / 2;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let radians = Math.atan(dy/dx);
    if (Math.cos(radians) === 0) return x + weight;
    if ((dy > 0 && dx > 0) || (dy < 0 && dx > 0)) {
      return x + Math.cos(radians) * weight;
    }
    return x - Math.cos(radians) * weight;
  }

  centerTextY(x1, x2, y1, y2, weight) {
    let y = (y1 + y2) / 2;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let radians = Math.atan(dy/dx);
    if (Math.sin(radians) === 0) return y + weight;
    if ((dy > 0 && dx > 0) || (dy < 0 && dx > 0)) {
      return y - Math.sin(radians) * weight;
    }
    return y + Math.sin(radians) * weight;
  }

  draw() {
    let color = d3.scaleOrdinal(d3.schemeCategory20);
    let graph = this.parseNodes();

    this.svg = d3.select("div.visualization").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    this.svg.append("defs").selectAll("marker")
        .data(["base", "color", "arrow"])
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
    this.arrowPath = d3.select('marker#arrow path');
    this.arrowPath
      .style("opacity", "0")
      .style("stroke", "crimson")
      .style("fill", "crimson");

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

    this.bezierLine = d3.line()
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .curve(d3.curveBundle.beta(0.5));

    this.svg.selectAll("text.link")
        .data(graph.links)
        .enter().append("text")
        .attr("class", "link")
        .attr("x", (d) => this.centerTextX(d.source.x, d.target.x, d.source.y, d.target.y, 10))
        .attr("y", (d) => this.centerTextY(d.source.x, d.target.x, d.source.y, d.target.y, 10))
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(function(d) { return d.weight });

    this.nodeWrapper = this.nodeGroup
        .enter().append("g")

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

  animateLink(fromId, toId, color) {
    let link = this.links._groups[0].find( link => link.id === `${fromId}-${toId}`);
    let source = this.nodeList[link.id[0]];
    let target = this.nodeList[link.id[2]];
    let path = this.svg.append("path")
      .attr("stroke", "red")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("d", (d) => this.bezierLine([
          [source.x, source.y],
          [source.x, source.y]
        ])
      )
      .style("stroke-width", 3);

    path
      .transition()
      .duration(1000)
      .attr("d", this.bezierLine([
        [source.x, source.y],
        [this.centerTextX(source.x, target.x, source.y, target.y, 40), this.centerTextY(source.x, target.x, source.y, target.y, 40)],
        [target.x, target.y]
      ]))
      .attrTween("stroke-dasharray", function() {
            d3.select(this).moveToBack();
            var len = Math.sqrt((source.x - target.x) ** 2 + (source.y - target.y) ** 2);
            return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
      })
      .style("marker-end", "url(#arrow)")
    setTimeout( () => this.arrowPath.transition().duration(300).style("opacity", "1"), 500 );
    setTimeout( () => {
      this.arrowPath.transition().duration(700).style("opacity", "0");
      path.transition().duration(500).style("opacity", "0").remove();
    }, 1500)
  }

  changeText(textFunction) {
    this.nodeText.text((d) => textFunction(d));
  }
}

export default Visualization;
