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

  const circles = appendCircles(nodes, data.clusters, data.institutions);

  setListenersForCircleHighlighting(nodes, institutionColors);

  // Hover text
  circles.append("title")
            .text(function(d) { return d.id; });

  appendNameToPeople(nodes);
  appendTitleToPeople(nodes);

  return nodes;
}




const appendCircles = (nodes, clusters, institutions) => {
  const institutionsObject = arrayToObject(institutions);

  return nodes
      .append("circle")
        .attr("r", 10)
        .style("stroke", function(d) {
          debugger
          if(!d.institution) return 'gray';
          const cluster = institutionsObject[d.institution].cluster;
          return cluster ? clusters[cluster].color : 'gray';
        })
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




const arrayToObject = (array) => {
  const object = {};

  array.forEach((el) => {
    object[el.id] = el
  })

  return object;
}
