const d3 = require('d3');


export const appendPeople = (visualization, data, width, height, employmentsObject, getClusterData) => {

  const nodes = visualization
      .selectAll("g.nodes")
      .data(data.people, (d) => d.id)
      .enter()
      .append("g")
        .attr('id', (d) => `${d.id.split(' ').join('')}Node`)
        .attr("class", "nodes")
        .attr('transform', 'translate(' + height*(-2/5) + ',' + width*(-2/5) + ')');

  const circles = appendCircles(nodes, data, employmentsObject, getClusterData);

  setListenersForCircleHighlighting(nodes, employmentsObject, getClusterData);

  // Hover text
  circles.append("title")
            .text(function(d) { return d.id; });

  appendNameToPeople(nodes);
  appendTitleToPeople(nodes);

  return nodes;
}



const appendCircles = (nodes, data, employmentsObject, getClusterData) => {

  return nodes
      .append("circle")
        .attr("r", 10)
        .style("stroke", function(d) {
          return calculateStrokeColor(d, employmentsObject, getClusterData);
        })
        .style("stroke-width", 1.75)
        .attr("fill", function(d){ return `url('#${d.id}')` } )
        .attr("fill-opacity", (d) => {
          return d.institution ? 1 : 0.7;
        })
        .attr("stroke-opacity", (d) => {
          return d.institution ? 1 : 0.7;
        });
}



// current white house = prev employment color
// former white house = gray
// current white house no prior affiliation: blue

const calculateStrokeColor = (d, employmentsObject, getClusterData) => {
  if(!d.institution) return 'gray';
  const mostRecentPrevEmployerObject = employmentsObject[d.id];
  if(!mostRecentPrevEmployerObject) return 'darkblue';
  const mostRecentEmployer = mostRecentPrevEmployerObject.institution;
  return getClusterData(mostRecentEmployer).color;
}



const setListenersForCircleHighlighting = (nodes, employmentsObject, getClusterData) => {
  nodes
      .on("mouseover", function(){
        d3.select(this).select('circle').style("stroke", "yellow")
      })
      .on("mouseout", function(){
        d3.select(this).select('circle').style("stroke", (d) => {
          return calculateStrokeColor(d, employmentsObject, getClusterData);
        })
      });
}



const appendNameToPeople = (nodes) => {
  return nodes
       .append('text')
         .text((d) => d.id)
         .style('font-family', 'Roboto')
         .style("font-size", "9px")
         .style("font-weight", "700")
         .style("opacity", (d) => {
           return d.institution ? 1 : 0.5;
         })
         .attr("text-anchor", "middle")
         .style("text-shadow", "2px 2px 1px white, -2px -2px 1px white")
         .attr("transform", "translate(0,20)");
}

const appendTitleToPeople = (nodes) => {
  return nodes
       .append('text')
         .text((d) => d.title)
         .style('font-family', 'Roboto')
         .style("font-size", "8px")
         .style("opacity", (d) => {
           return d.institution ? 1 : 0.5;
         })
         .style("font-weight", "500")
         .attr("text-anchor", "middle")
         .style("text-shadow", "2px 2px 1px white, -2px -2px 1px white")
         .attr("transform", "translate(0,30)");
}
