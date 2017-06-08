class Graph {

  draw() {
    let data = [
      {numNodes: 10, runtime: 100},
      {numNodes: 50, runtime: 200},
      {numNodes: 100, runtime: 300},
      {numNodes: 500, runtime: 400},
      {numNodes: 1000, runtime: 500}
    ];

    var div = d3.select("div.comp-graph"),
        svg = div.append("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        // width = Number(svg.attr("width")) - margin.left - margin.right,
        // height = Number(svg.attr("height")) - margin.top - margin.bottom,
        width = 500,
        height = 500,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        debugger;
    // var parseTime = d3.timeParse("%d-%b-%y");
    svg.data(data);

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

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
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
        .select(".domain")
          .remove();

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
  // draw() {
  //
  // // Width = Flex, height = 500px
  // // Set the dimensions of the canvas / graph
  // var margin = {top: 30, right: 20, bottom: 30, left: 50},
  //     width = 500,
  //     height = 500;
  //
  // // // Parse the date / time
  // // var parseDate = d3.time.format("%d-%b-%y").parse;
  //
  // // debugger;
  // // Set the ranges
  // var x = d3.range([0, width]);
  // var y = d3.range([height, 0]);
  //
  // // Adds the svg canvas
  // var svg = d3.select("li.comp-graph")
  //   .append("svg")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //   .attr("transform",
  //   "translate(" + margin.left + "," + margin.top + ")");
  //
  // // Define the axes
  // var xAxis = d3.select(".axis")
  //     .call(d3.axisBottom(x)).ticks(5);
  //
  // var yAxis = d3.select(".axis")
  //     .call(d3.axisLeft(y)).ticks(5);
  //
  // // Define the line
  // var valueline = d3.svg.line()
  //     .x(function(d) { return x(d.numNodes); })
  //     .y(function(d) { return y(d.runtime); });
  //
  //
  // // Get the data
  //   d3.data = [
  //               {numNodes: 10, runtime: 100},
  //               {numNodes: 50, runtime: 200},
  //               {numNodes: 100, runtime: 300},
  //               {numNodes: 500, runtime: 400},
  //               {numNodes: 1000, runtime: 500}
  //             ];
  //
  //     // d3.csv("data.csv", function(error, data) {
  //     //     data.forEach(function(d) {
  //     //         d.date = parseDate(d.date);
  //     //         d.close = Number(d.close);
  //     //    }
  //     // });
  //
  //     // Scale the range of the data
  //     x.domain(d3.extent(data, function(d) { return d.numNodes; }));
  //     y.domain([0, d3.max(data, function(d) { return d.runtime; })]);
  //
  //     // Add the valueline path.
  //     svg.append("path")
  //         .attr("class", "line")
  //         .attr("d", valueline(data));
  //
  //     // Add the X Axis
  //     svg.append("g")
  //         .attr("class", "x axis")
  //         .attr("transform", "translate(0," + height + ")")
  //         .call(xAxis);
  //
  //     // Add the Y Axis
  //     svg.append("g")
  //         .attr("class", "y axis")
  //         .call(yAxis);
  // }
}

export default Graph;
