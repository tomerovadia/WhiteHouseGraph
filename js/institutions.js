const d3 = require('d3');

export const appendinstitutions = (svg, visualization, data, width, height, clustersObject) => {


  const institutions = visualization.selectAll('g.institution')
      .data(data.institutions, (d) => d.id)
      .enter()
      .append('g')
        .attr('id', (d) => d.id)
        .classed('institution', true)
        .attr('id', (d) => `${d.id}Institution`)
        .attr('transform', 'translate(' + height*(-2/5) + ',' + width*(-2/5) + ')');

  prepareCircleImages(svg, data);
  appendCirclesToInstitutions(institutions, clustersObject);
  appendTextToinstitutions(institutions);

  return institutions;
}

const appendCirclesToInstitutions = (institutions, clustersObject) => {

  return institutions
      .append('ellipse')
      .attr("fill", function(d){
        const clusterColor = clustersObject[d.cluster].color;
        return d.useImageFileFill ? `url('#${d.id}')` : clusterColor;
      } )
      .attr('rx', (d) => {
        return d.id === 'White House' ? 120 : 37;
      })
      .attr('ry', (d) => {
        return d.id === 'White House' ? 81.75 : 37;
      })
      .style('stroke', (d) => {
        if(!(d.id === 'White House')) return 'black';
      })
      .style('stroke-width', (d) => {
        if(d.id === 'White House') return -5;
        return 2;
      });
}

const appendTextToinstitutions = (institutions) => {
  return institutions.append('text')
      .text((d) => {
        if(!(d.id === 'White House')) return d.id;
      })
      .style('font-family', 'Arial')
      .style("font-size", "9px")
      .style("fill", (d) => d.textColor || "white")
      .attr("text-anchor", "middle")
      .style("font-weight", "600")
      .style("text-shadow", (d) => d.textShadowColor ? `1px 1px 2px ${d.textShadowColor}` : "1px 1px 2px black");
}

const prepareCircleImages = (svg, data) => {
  const defs = svg.append("defs").attr("id", "imgdefs");

  const patterns = defs
      .selectAll('pattern')
      .data(data.people.concat(data.institutions))
      .enter()
      .append("pattern")
        .attr("id", function(d){ return d.id } )
        .attr("height", 1)
        .attr("width", 1)
        .attr("viewBox", "0 0 100 100")
        .attr("preserveAspectRatio", "none")
        .attr("x", "0")
        .attr("y", "0");

  patterns
      .append("image")
        .attr("preserveAspectRatio", "none")
        .attr("height", 100)
        .attr("width", 100)
        .attr("xlink:href", function(d){
          if(d.img_url) return d.img_url;
          if(d.useImageFileFill) return `../mugshots/${d.id}.jpg`;
        });
}
