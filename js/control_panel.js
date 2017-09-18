const d3 = require('d3');
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
        d3.select('button').html('See Trump Administration')
        renderVisualization(d3.select('svg'), d3.select('.container'), config.svgWidth, config.svgHeight, "obama.json", false);
        administration = 'obama';
        d3.select('#administration-h2').html(`Obama Administration`);
      break
      case 'obama':
        d3.select('button').html('See Obama Administration')
        renderVisualization(d3.select('svg'), d3.select('.container'), config.svgWidth, config.svgHeight, "trump.json", false);
        administration = 'trump';
        d3.select('#administration-h2').html(`Trump Administration`);
    }
  }
}
