import * as d3 from "d3";

import { renderVisualization } from './graph';

export const prepareControlPanel = (config) => {
  d3.select('button')
    .on('click', toggleAdministration(config))
}

let administration = 'trump';

const toggleAdministration = (config) => {
  return () => {
    switch(administration){
      case 'trump':
        d3.select('.main-node').select('ellipse').transition().attr('fill', "url('#obama')");
        d3.select('button').html('See Trump Administration');
        d3.select('button').style('background-color', 'darkred');
        renderVisualization(d3.select('svg'), d3.select('.container'), config.svgWidth, config.svgHeight, "obama", false);
        administration = 'obama';
        d3.select('#administration-h2').html(`Obama Administration`);
      break
      case 'obama':
        d3.select('.main-node').select('ellipse').attr('fill', "url('#trump')");
        d3.select('.main-node').attr('id', 'Trump');
        d3.select('button').html('See Obama Administration');
        d3.select('button').style('background-color', 'darkblue');
        renderVisualization(d3.select('svg'), d3.select('.container'), config.svgWidth, config.svgHeight, "trump", false);
        administration = 'trump';
        d3.select('#administration-h2').html(`Trump Administration`);
    }
  }
}
