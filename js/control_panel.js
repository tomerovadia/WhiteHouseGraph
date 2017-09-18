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
        renderVisualization(d3.select('svg'), d3.select('.container'), config.svgWidth, config.svgHeight, "obama.json");
        administration = 'obama';
      break
      case 'obama':
        renderVisualization(d3.select('svg'), d3.select('.container'), config.svgWidth, config.svgHeight, "trump.json");
        administration = 'trump';
    }
  }
}
