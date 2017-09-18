const d3 = require('d3');
import {Selection, select } from 'd3-selection';
import {transition} from 'd3-transition';
import initiateTour from './tour';
import {renderCanvass} from './canvass';
import { renderVisualization, createForceLayout } from './graph';
import { prepareControlPanel, toggleAdministration } from './control_panel';
import { prepareImagePatterns } from './image_patterns';

const config = {
  svgHeight: 5000,
  svgWidth: 5000,
}

export const renderVisualizationWithSettings = () => {
  renderVisualization(d3.select('svg'), d3.select('.container'), config.svgWidth, config.svgHeight, "trump", true);
}

prepareImagePatterns();
renderCanvass(config);
renderVisualizationWithSettings();
prepareControlPanel(config);

initiateTour();
