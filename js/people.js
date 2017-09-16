const d3 = require('d3');


export const appendPeople = (visualization, data, width, height, institutionsObject, clustersObject, employmentsObject) => {

  const nodes = visualization
      .selectAll("g.nodes")
      .data(data.people, (d) => d.id)
      .enter()
      .append("g")
        // .attr('fx', 2500)
        // .attr('fy', 2500)
        .attr('id', (d) => `${d.id.split(' ').join('')}Node`)
        .attr("class", "nodes")
        .attr('transform', 'translate(' + height*(-2/5) + ',' + width*(-2/5) + ')');

  const circles = appendCircles(nodes, data, institutionsObject, clustersObject, employmentsObject);

  setListenersForCircleHighlighting(nodes, institutionsObject);

  // Hover text
  circles.append("title")
            .text(function(d) { return d.id; });

  appendNameToPeople(nodes);
  appendTitleToPeople(nodes);

  return nodes;
}



const appendCircles = (nodes, data, institutionsObject, clustersObject, employmentsObject) => {

  return nodes
      .append("circle")
        .attr("r", 10)
        .style("stroke", function(d) {
          return calculateStrokeColor(d, institutionsObject, clustersObject, employmentsObject);
        })
        .style("stroke-width", 1.75)
        .attr("fill", function(d){ return `url('#${d.id}')` } );
}

const calculateStrokeColor = (d, institutionsObject, clustersObject, employmentsObject) => {
  if(!d.institution) return 'gray';
  const mostRecentPrevEmployerObject = employmentsObject[d.id];
  if(!mostRecentPrevEmployerObject) return 'darkblue';
  const mostRecentEmployer = mostRecentPrevEmployerObject.institution;
  const cluster = institutionsObject[mostRecentEmployer].cluster;
  return cluster ? clustersObject[cluster].color : 'gray';
}


// current white house = prev employment color
// former white house = gray
// current white house no prior affiliation: blue



const setListenersForCircleHighlighting = (nodes, institutionsObject) => {
  nodes
      .on("mouseover", function(){
        d3.select(this).select('circle').style("stroke", "yellow")
      })
      .on("mouseout", function(){
        d3.select(this).select('circle').style("stroke", (d) => institutionsObject[d.institution] )
      });
}



const appendNameToPeople = (nodes) => {
  return nodes
       .append('text')
         .text((d) => d.id)
         .style('font-family', 'Roboto')
         .style("font-size", "9px")
         .style("font-weight", "700")
         .attr("text-anchor", "middle")
         .style("text-shadow", "1px 1px 2px white")
         .attr("transform", "translate(0,20)");
}

const appendTitleToPeople = (nodes) => {
  return nodes
       .append('text')
         .text((d) => d.title)
         .style('font-family', 'Roboto')
         .style("font-size", "8px")
         .style("font-weight", "500")
         .attr("text-anchor", "middle")
         .style("text-shadow", "1px 1px 2px white")
         .attr("transform", "translate(0,30)");
}
