const d3 = require('d3');

export const prepareImagePatterns = () => {

  d3.json(`obama.json`, function(error, obama) {
    d3.json(`trump.json`, function(error, trump) {

        const patterns = d3.select('#imgdefs')
          .selectAll('pattern')
          .data(obama.people.concat(trump.people).concat(obama.institutions).concat(trump.institutions).concat([{"id": "obama", "useImageFileFill": true},{"id": "trump", "useImageFileFill": true}]), (d) => d.id)
          .enter()
          .append("pattern");

        patterns
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
    })
  })
}
