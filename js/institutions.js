const d3 = require('d3');

export const appendinstitutions = (svg, visualization, data, width, height) => {


  const institutions = visualization.selectAll('g.institution')
      .data(data.institutions, (d) => d.id)
      .enter()
      .append('g')
      .attr('id', (d) => d.id)
      .classed('institution', true)
      .attr('id', (d) => `${d.id}Institution`)
      .attr('transform', 'translate(' + height*(-2/5) + ',' + width*(-2/5) + ')');
      // .attr('fx', 2500)
      // .attr('fy', 2500)
      // .attr('transform', (d, i) => {
      //   d.x = (i+3)**5;
      //   d.y = 250;
      //   return `translate(${(i+3)**5}, 250)`;
      // })

  prepareCircleImages(svg, data);
  appendCirclesToinstitutions(institutions);
  appendTextToinstitutions(institutions);

  return institutions;
}

const appendCirclesToinstitutions = (institutions) => {
  return institutions
      .append('ellipse')
      // .style('fill', (d) => d.color)
      .attr("fill", function(d){
        if(d.color) return d.color;
        return `url('#${d.id}')`;
      } )
      .attr('rx', (d) => {
        if(d.id === 'White House') return 120;
        return 30;
      })
      .attr('ry', (d) => {
        if(d.id === 'White House') return 81.75;
        return 30;
      })
      .style('stroke', (d) => {
        if(!(d.id === 'White House')) return 'black';
      })
      .style('stroke-width', (d) => {
        if(d.id === 'White House') return -5;
        return 2;
      })
      .attr("fill", function(d){ return `url('#${d.id}')` } );
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
        // .attr("xlink:href", function(d){ return d.img_url});
        .attr("xlink:href", function(d){
          if(d.img_url) return d.img_url;
          if(d.useImageFileFill) return `../mugshots/${d.id}.jpg`;

        });
}
