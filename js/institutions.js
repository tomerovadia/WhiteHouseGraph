const d3 = require('d3');
import {Selection, select } from 'd3-selection';
import {transition} from 'd3-transition';

const institutionRadius = 27;

export const appendinstitutions = (svg, visualization, data, width, height, clustersObject, dataFile) => {

  const institutions = visualization.selectAll('g.institution')
        .data(data.institutions, (d) => d.id);

  institutions.exit().transition().attr('r',0).remove();

  const newInstitutions = institutions.enter().append('g');

  newInstitutions
        .classed('institution', true)
        .classed('main-node', (d) => {
          return d.id === 'White House' ? true : false
        })
        .attr('id', (d) => `${d.id} Institution`)
        .attr('transform', 'translate(' + height*(-2/5) + ',' + width*(-2/5) + ')');

  // prepareCircleImages(data);
  appendCirclesToInstitutions(newInstitutions, clustersObject, dataFile);
  appendTextToinstitutions(newInstitutions);

  return visualization.selectAll('g.institution');
}

const appendCirclesToInstitutions = (institutions, clustersObject, dataFile) => {

  return institutions
      .append('ellipse')
      .attr("fill", function(d){
        if(d.id === 'White House') return `url('#${dataFile}')`;
        const clusterColor = clustersObject[d.cluster].color;
        return d.useImageFileFill ? `url('#${d.id}')` : clusterColor;
      })
      .attr('rx', (d) => {
        return d.id === 'White House' ? 50 : institutionRadius;
      })
      .attr('ry', (d) => {
        return d.id === 'White House' ? 50 : institutionRadius;
      })
      .style('stroke', (d) => 'black')
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
