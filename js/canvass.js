const d3 = require('d3');

export const renderCanvass = (config) => {

  var width = config.svgWidth,
    height = config.svgHeight;

  var zoom = d3.zoom()
  .scaleExtent([1, 10])
  .on("zoom", zoomed);

  var svg = d3.select("body").append("svg")
  .classed('svg', true)
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .classed('viewport', true)
  .attr('transform', 'translate(' + height*(-2/5) + ',' + width*(-2/5) + ')')
  .call(zoom);

  var rect = svg.append("rect")
  .classed('rect', true)
  .attr("width", width)
  .attr("height", height)
  .style("fill", "none")
  .style("pointer-events", "all");

  var container = svg.append("g").classed('container', true);

  container.append("g")
  .attr("class", "x axis")
  .selectAll("line")
  .data(d3.range(0, width, 10))
  .enter().append("line")
  .attr("x1", function(d) { return d; })
  .attr("y1", 0)
  .attr("x2", function(d) { return d; })
  .attr("y2", height);

  container.append("g")
  .attr("class", "y axis")
  .selectAll("line")
  .data(d3.range(0, height, 10))
  .enter().append("line")
  .attr("x1", 0)
  .attr("y1", function(d) { return d; })
  .attr("x2", width)
  .attr("y2", function(d) { return d; });


  function zoomed() {
    container.attr("transform", d3.event.transform);
  }

  const visualization = container.append('g')
    .classed('visualization', true);

  visualization.append("g")
        .attr("class", "links")

  svg.append("defs").attr("id", "imgdefs");
}
