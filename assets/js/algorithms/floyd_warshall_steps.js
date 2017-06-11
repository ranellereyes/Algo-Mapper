import FloydWarshall from "./floyd_warshall";
import { cloneDeep } from "lodash";

export default class FloydWarshallSteps extends FloydWarshall {
  constructor(nodelist, start, end, visual) {
    super(nodelist);
    this.visualization = visual;
    this.steps = [];
    this.search(start, end);
    this.currStep = 0;

    this.addText = this.addText.bind(this);
  }

  clear() {
    d3.selectAll(".node")
    .transition()
    .duration(500)
    .style("fill", "lightblue");

    d3.selectAll(".corner_text")
      .transition()
      .duration(500)
      .style('opacity', 0)
      .remove();

    let nodeIds = Object.keys(this.nodelist).map(e => Number(e));

    nodeIds.forEach(id => {
      d3.selectAll(`text.node-${id}`)
      .transition()
      .duration(500)
      .style('opacity', 0)
      .remove();

      nodeIds.forEach(id2 => {
        this.visualization.unhighlightLink(id, id2);
      });
    });
  }

  addText(text, dy, color = "steelblue") {
    d3.select(`svg`).append('text')
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

  draw(currStep) {
    let visual = this.visualization,
    step = this.steps[this.currStep],
    { nodes, loops, tables, changed } = step;

    // d3.select(`svg`).append('text')
    //   .text(`i = ${loops[0]}, j = ${loops[1]}, k = ${loops[2]}`)
    //   .attr('class', `corner_text`)
    //   .attr('dx', 10)
    //   .attr('dy', 20)
    //   .style('opacity', 0)
    //   .style('fill', 'steelblue')
    //   .transition()
    //   .duration(500)
    //   .style('opacity', 1);
    //
    // d3.select(`svg`).append('text')
    //   .text(`i = source node, j = destination node, k = intermediate node`)
    //   .attr('class', `corner_text`)
    //   .attr('dx', 10)
    //   .attr('dy', 40)
    //   .style('opacity', 0)
    //   .style('fill', 'steelblue')
    //   .transition()
    //   .duration(500)
    //   .style('opacity', 1);

    this.addText(`i = ${loops[0]}, j = ${loops[1]}, k = ${loops[2]}`, 16);
    this.addText(`i = source node, j = destination node, k = intermediate node`, 30);

    let indices = this.indices;

    loops.forEach((node, idx) => {
      switch (idx) {
        case 0:
          let [i, j, k] = loops.map(e => indices.indexOf(String(e)));
          visual.highlightNode(node, "lightgreen");
          this.addText(`direct cost = ${tables.costs[i][j]}`, 44, "black");
          this.addText(`cost thru k = ${tables.costs[i][k] + tables.costs[k][j]}`, 58, "black");

          let color = changed ? "red" : "black",
              parent = tables.parents[i][j];

          visual.addText(node, -59, -29, color,
            (d) => `parent = ${parent}`);
          break;
        case 1:
          visual.highlightNode(node, "green");
          break;
        case 2:
          visual.highlightNode(node, "yellow");
          break;
        default:
          return;
      }
    });

    let non_index_nodes = nodes.filter(node => !loops.includes(node));

    if (non_index_nodes.length > 0) {
      non_index_nodes.forEach(node => {
        visual.highlightNode(node, "lightgreen");
      });
    }

    nodes.forEach((node, i) => {
      let child = nodes[i + 1];

      node >= Number(loops[2]) ?
        visual.highlightLink(node, child, "red") :
        visual.highlightLink(node, child, "lightgreen");
    });
  }

  stepForward() {
    if (this.currStep > this.steps.length) return;

    this.currStep += 1;
    this.clear();
    this.draw(this.steps[this.currStep]);
  }

  stepBackward() {
    if (this.currStep <= 0) return;

    this.currStep -= 1;
    this.clear();
    this.draw(this.steps[this.currStep]);
  }

  search(start, end) {
    for (let k = 0; k < this.indices.length; k++) {
      for (let i = 0; i < this.indices.length; i++) {
        for (let j = 0; j < this.indices.length; j++) {
          let path = [i, j, k].map(idx => this.indices[idx]),
              nodes = this.pathDeconstructor(...path).map(id => parseInt(id)),
              loops = [i, j, k].map(idx => parseInt(this.indices[idx])),
              changed = false;

          if (this.costs[i][j] > this.costs[i][k] + this.costs[k][j]) {
            this.costs[i][j] = this.costs[i][k] + this.costs[k][j];
            this.parents[i][j] = this.parents[k][j];
            changed = true;
          }

          let parents = _.cloneDeep(this.parents),
              costs = _.cloneDeep(this.costs);

          this.steps.push({nodes, loops, tables: { parents, costs }, changed});
        }
      }
    }
    return this.steps;
  }
}
