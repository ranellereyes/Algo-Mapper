import { merge } from 'lodash';

d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
      var firstChild = this.parentNode.firstChild;
      if (firstChild) {
          this.parentNode.insertBefore(this, firstChild);
      }
  });
};

class Visualization {
  constructor(nodeList, target, scale) {
    this.nodeList = nodeList;
    this.target = target;
    this.scale = scale || 1;
    this.nodeScale = scale / 1.5 || 1;
  }

  parseNodes() {
    let nodes = [];
    let list = {};
    for (let key in this.nodeList) {
      list[key] = merge({}, this.nodeList[key]);
    }
    let keys = Object.keys(list).sort();
    keys.forEach( idx => {
      list[idx].x /= this.scale;
      list[idx].y /= this.scale;
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

  centerTextX(x1, x2, y1, y2, weight, direction) {
    let x = (x1 + x2) / 2;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let radians = Math.atan(dy/dx);
    if (Math.sin(radians) === 0) return x;
    if (Math.cos(radians) < 0.001 && Math.cos(radians) > -0.001) return x + weight * direction;
    if ((dy < 0 && dx < 0) || (dy > 0 && dx < 0)) {
      return x - (Math.cos(radians) * weight) * direction;
    }
    return x + (Math.cos(radians) * weight) * direction;
  }

  centerTextY(x1, x2, y1, y2, weight, direction) {
    let y = (y1 + y2) / 2;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let radians = Math.atan(dy/dx);
    if (Math.cos(radians) < 0.001 && Math.cos(radians) > -0.001) return y;
    if (Math.sin(radians) === 0) return y + weight * direction;
    if ((dy < 0 && dx < 0) || (dy > 0 && dx < 0)) {
      return y + (Math.sin(radians) * weight) * direction;
    }
    return y - (Math.sin(radians) * weight) * direction;
  }

  addCornerText(text, dy, color = "steelblue") {
    this.svg
      .append('text')
      .text(text)
      .attr('class', `corner_text`)
      .attr('dx', 10)
      .attr('dy', dy)
      .attr('font-size', 12)
      .style('opacity', 0)
      .style('fill', color)
      .transition()
      .duration(500)
      .style('opacity', 1);
  }

  addArrow(defs, link, color, animate) {
    let arrow = defs
      .data([`arrow-${link.source.id}-${link.target.id}${animate ? animate : ''}-${this.target}`])
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
      .style("fill", color)
      .style("stroke", color)
      .style("opacity", `${animate ? 0 : 1}`);

    if (animate) arrow.transition().duration(500).delay(300).style('opacity', 1);
  }

  draw() {
    let graph = this.parseNodes();
    this.svg = d3.select(`div.${this.target}`).append("svg")
        .attr("width", 500 / this.scale)
        .attr("height", 500 / this.scale);
    this.nodeGroup = this.svg.selectAll("g")
      .data(graph.nodes);

    this.links = this.svg.selectAll(`line.link-${this.target}`)
        .data(graph.links)
        .enter().append("line")
        .attr("stroke", "gray")
        .attr("class", `link-${this.target}`)
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr("id", function(d) { return `${d.source.id}-${d.target.id}`})
        .style("stroke-width", 3)
        .style("marker-end",  (d) => `url(#arrow-${d.source.id}-${d.target.id}-${this.target})`);

    this.defs = this.svg.append('defs').selectAll('marker');
    this.links.each( link => {
      this.addArrow(this.defs, link, 'gray')
    })

    this.bezierLine = d3.line()
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .curve(d3.curveCardinal.tension(-1.5));

    this.svg.selectAll(`text.link-${this.target}`)
        .data(graph.links)
        .enter().append("text")
        .attr("class", `link-${this.target}`)
        .attr("x", (d) => this.centerTextX(d.source.x, d.target.x, d.source.y, d.target.y, 15, -1))
        .attr("y", (d) => this.centerTextY(d.source.x, d.target.x, d.source.y, d.target.y, 15, -1))
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(function(d) { return d.weight });

    this.nodeWrapper = this.nodeGroup
        .enter().append("g").attr("class", (d) => `node-${d.id}-${this.target}`);

    this.nodeWrapper
        .append("circle")
        .attr("class", `node-${this.target}`);

    this.nodeText = this.nodeWrapper.append("text")
        .attr("x", function(d) { return d.x })
        .attr("y", function(d) { return d.y })
        .attr("dy", 5)
        .attr("dx", -2)
        .attr("text-anchor", "middle")
        .text(function(d) { return d.id });

    this.nodes = d3.selectAll(`.node-${this.target}`)
        .attr("r", 20 / this.nodeScale)
        .attr("id", function(d) { return d.id })
        .attr("cx", function(d) { return d.x })
        .attr("cy", function(d) { return d.y })
        .style("fill", "LightBlue")
        .style("stroke", "black")
        .style("stroke-width", 2);
  }

  clearLinks() {
    d3.selectAll(`line.link-${this.target}`)
      .transition()
      .duration(500)
      .style('stroke', 'grey');
    d3.selectAll(`div.${this.target} path`)
      .transition()
      .duration(500)
      .style('stroke', 'grey')
      .style('fill', 'grey');
  }

  clearNodes() {
    d3.selectAll(`circle.node-${this.target}`).transition().duration(500)
      .style("fill", "lightblue")
      .style("r", 20 / this.nodeScale);
  }

  unhighlightNode(id) {
    d3.select(this.nodes._groups[0][id - 1]).transition().duration(500)
      .style("fill", "lightblue")
      .style("r", 20 / this.nodeScale);
  }

  highlightNode(id, color) {
    d3.select(this.nodes._groups[0][id - 1]).transition().duration(500)
      .style("fill", color)
      .style("r", 22 / this.nodeScale);
  }

  unhighlightLink(fromId, toId) {
    d3.select(this.links._groups[0].find( link => link.id === `${fromId}-${toId}`))
      .transition()
      .duration(500)
      .style('stroke', 'grey');
    d3.select(`#arrow-${fromId}-${toId}-${this.target} path`)
      .transition()
      .duration(500)
      .style('stroke', 'grey')
      .style('fill', 'grey');
  }

  highlightLink(fromId, toId, color) {
    d3.select(this.links._groups[0].find( link => link.id === `${fromId}-${toId}`))
      .transition()
      .duration(500)
      .style('stroke', color);
    d3.select(`#arrow-${fromId}-${toId}-${this.target} path`)
      .transition()
      .duration(500)
      .style('stroke', color)
      .style('fill', color);
  }

  animateLink(fromId, toId, color) {
    let source = this.nodeList[fromId];
    let target = this.nodeList[toId];
    let path = this.svg.append("path")
      .attr("stroke", color)
      .attr("class", `link-${this.target}`)
      .attr("fill", "none")
      .attr("d", (d) => this.bezierLine([
          [source.x, source.y],
          [source.x, source.y]
        ])
      )
      .style("stroke-width", 3)
      .style('fill', 'white');

    path
      .transition()
      .duration(600)
      .attr("d", this.bezierLine([
        [source.x, source.y],
        [this.centerTextX(source.x, target.x, source.y, target.y, 20, 1), this.centerTextY(source.x, target.x, source.y, target.y, 20, 1)],
        [target.x, target.y]
      ]))
      .attrTween("stroke-dasharray", function() {
            d3.select(this).moveToBack();
            var len = Math.sqrt((source.x - target.x) ** 2 + (source.y - target.y) ** 2);
            return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
      })
      .style("marker-end", `url(#arrow-${fromId}-${toId}-animate-${this.target})`);

    setTimeout( () => {
      d3.selectAll('svg > path').transition().duration(300).style("opacity", "0").remove()
    }, 650);
  }

  addText(nodeId, dx, dy, color, textFunction) {
    d3.select(`g.node-${nodeId}-${this.target}`).append('text')
      .text((d) => textFunction(d))
      .attr('class', `node-${nodeId}-${this.target}`)
      .attr('dx', dx)
      .attr('dy', dy)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .style('opacity', 0)
      .style('fill', color)
      .transition()
      .duration(500)
      .style('opacity', 1);
  }

  removeText(nodeId) {
    d3.selectAll(`text.node-${nodeId}-${this.target}`)
      .transition()
      .duration(500)
      .style('opacity', 0)
      .remove()
  }

  changeAllText(textFunction) {
    this.nodeText.text((d) => textFunction(d));
  }
}

export default Visualization;
