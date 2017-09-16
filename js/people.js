const d3 = require('d3');


export const appendPeople = (visualization, data, institutionColors, width, height) => {

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

  const circles = appendCircles(nodes, institutionColors);

  setListenersForCircleHighlighting(nodes, institutionColors);

  // Hover text
  circles.append("title")
            .text(function(d) { return d.id; });

  appendNameToPeople(nodes);
  appendTitleToPeople(nodes);

  return nodes;
}




const appendCircles = (nodes, institutionColors) => {
  return nodes
      .append("circle")
        .attr("r", 10)
        .style("stroke", function(d) { return institutionColors[d.institution]; })
        .style("stroke-width", 1.5)
        .attr("fill", function(d){ return `url('#${d.id}')` } );
}



const setListenersForCircleHighlighting = (nodes, institutionColors) => {
  nodes
      .on("mouseover", function(){
        d3.select(this).select('circle').style("stroke", "yellow")
      })
      .on("mouseout", function(){
        d3.select(this).select('circle').style("stroke", (d) => institutionColors[d.institution] )
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
