class Graph {

  draw(data1, data2) {
    // -- LINEAR DATA TEST --
    // data1 = [
    //   {numNodes: 10, runtime: 15},
    //   {numNodes: 25, runtime: 50},
    //   {numNodes: 40, runtime: 80},
    //   {numNodes: 50, runtime: 90},
    //   {numNodes: 80, runtime: 160},
    //   {numNodes: 100, runtime: 210}
    // ];

    // -- QUAD DATA TEST --
      data1 = [
        {numNodes: 10, runtime: 100},
        {numNodes: 20, runtime: 400},
        {numNodes: 50, runtime: 2505},
        {numNodes: 80, runtime: 6400},
        {numNodes: 100, runtime: 100000}
      ];

    // -- CUBIC DATA TEST --
    data2 = [
      {numNodes: 5, runtime: 125},
      {numNodes: 11, runtime: 1000},
      {numNodes: 20, runtime: 8000},
      {numNodes: 51, runtime: 12500},
      {numNodes: 80, runtime: 51200},
      {numNodes: 100, runtime: 1000000}
    ];

    let compData = data1.concat(data2);

    var div = d3.select("div.comp-graph"),
        svg = div.append("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        // width = Number(div.attr("width")) - margin.left - margin.right,
        // height = Number(div.attr("height")) - margin.top - margin.bottom,
        width = 500,
        height = 500,
        g = svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.data(compData);
    svg.style("width", width).style("height", height);

    var x = d3.scaleLinear()
        .rangeRound([0, width - margin.left - margin.right]);

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom - margin.top, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.numNodes); })
        .y(function(d) { return y(d.runtime); })
        .curve(d3.curveBasis);

    var dotMapX = function(d) { return x(d.numNodes) + margin.left;};
    var dotMapY = function(d) { return y(d.runtime) + margin.top;};

      x.domain(d3.extent(compData, function(d) { return d.numNodes; }));
      y.domain(d3.extent(compData, function(d) { return d.runtime; }));

      g.append("g")
          .attr("transform", "translate(0," + 450 + ")")
          .call(d3.axisBottom(x))
          .append("text")
            .attr("fill", "#000")
            .attr("x", 215)
            .attr("y", -8)
            .attr("dx", "0.71em")
            .attr("text-anchor", "middle")
            .text("Number of Nodes");
        // .select(".domain")
        //   .remove();

      // svg.selectAll("dot")
      //   .data(data)
      //   .enter().append("circle")
      //   .attr("r", 3.5)
      //   .attr("cx", function(d) { return x(d.numNodes); })
      //   .attr("cy", function(d) { return y(d.runtime); });

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
          .datum(data1)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);

      g.append("path")
          .datum(data2)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);

      svg.selectAll(".dot")
         .data(data1)
       .enter().append("circle")
         .attr("class", "dot")
         .attr("fill", "steelblue")
         .attr("r", 3.5)
         .attr("cx", dotMapX)
         .attr("cy", dotMapY);

       svg.selectAll(".dot2")
          .data(data2)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("fill", "red")
          .attr("r", 3.5)
          .attr("cx", dotMapX)
          .attr("cy", dotMapY);
  }
}

export default Graph;
