class Graph {

  draw() {
    let data = [
      {numNodes: 10, runtime: 20},
      {numNodes: 50, runtime: 100},
      {numNodes: 100, runtime: 200},
      {numNodes: 500, runtime: 1000},
      {numNodes: 1000, runtime: 2000}
    ];

    var div = d3.select("div.comp-graph"),
        svg = div.append("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        // width = Number(div.attr("width")) - margin.left - margin.right,
        // height = Number(div.attr("height")) - margin.top - margin.bottom,
        width = 500,
        height = 500,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.data(data);
    svg.style("width", width)
        .style("height", height);

    var x = d3.scaleLinear()
        .rangeRound([0, width - margin.left - margin.right]);

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom - margin.top, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.numNodes); })
        .y(function(d) { return y(d.runtime); });

    // d3.tsv("data.tsv", function(d) {
    //   d.date = parseTime(d.date);
    //   d.close = Number(d.close);
    //   return d;
    // }, function(error, data) {
    //   if (error) throw error;

      x.domain(d3.extent(data, function(d) { return d.numNodes; }));
      y.domain(d3.extent(data, function(d) { return d.runtime; }));

      g.append("g")
          .attr("transform", "translate(0," + 450 + ")")
          .call(d3.axisBottom(x));
        // .select(".domain")
        //   .remove();

      g.append("g")
          .call(d3.axisLeft(y))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Runtime (microseconds)");

      g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);
  }
  
export default Graph;
