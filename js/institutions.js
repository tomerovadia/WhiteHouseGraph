const d3 = require('d3');

const institutionRadius = 27;

export const appendinstitutions = (svg, visualization, data, width, height, clustersObject) => {

  const institutions = visualization.selectAll('g.institution')
        .data(data.institutions, (d) => d.id);

  institutions.exit().transition().attr('r',0).remove();

  const newInstitutions = institutions.enter().append('g');

  newInstitutions
        .classed('institution', true)
        .attr('id', (d) => `${d.id} Institution`)
        .attr('transform', 'translate(' + height*(-2/5) + ',' + width*(-2/5) + ')');

  prepareCircleImages(svg, data);
  appendCirclesToInstitutions(newInstitutions, clustersObject);
  appendTextToinstitutions(newInstitutions);

  return visualization.selectAll('g.institution');
}

const appendCirclesToInstitutions = (institutions, clustersObject) => {

  return institutions
      .append('ellipse')
      .attr("fill", function(d){
        const clusterColor = clustersObject[d.cluster].color;
        return d.useImageFileFill ? `url('#${d.id}')` : clusterColor;
      } )
      .attr('rx', (d) => {
        return d.id === 'White House' ? 75 : institutionRadius;
      })
      .attr('ry', (d) => {
        return d.id === 'White House' ? 51.09375 : institutionRadius;
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
  return institutions
      .append('foreignObject')
      .attr('width', institutionRadius*2)
      .attr('height', institutionRadius*2)
      .attr('x', institutionRadius*-1)
      .attr('y', institutionRadius*-1)
      .append('xhtml:div')
      .style('width', `${institutionRadius*2}px`)
      .style('height', `${institutionRadius*2}px`)
      .style("text-align", "center")
      .style("border-radius", "100%")
      .style("display", "flex")
      .style("align-items", "center")
      .style("justify-content", "center")
      .append('xhtml:span')
      .style('line-height', 'normal')
      .style('display', 'block')
      .style('font-family', 'Roboto')
      .style("font-size", "7px")
      .style("color", (d) => d.textColor || "white")
      .style("font-weight", "600")
      .style("text-shadow", (d) => d.textShadowColor ? `1px 1px 2px ${d.textShadowColor}` : "1px 1px 2px black")
      .html((d) => {
        if(!(d.id === 'White House')) return d.id;
      })
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
