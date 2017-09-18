const d3 = require('d3');
var introJs = require("intro.js");
import {renderCanvass} from './canvass';
import { renderVisualization } from './graph';
import { prepareControlPanel, toggleAdministration } from './control_panel';

export const config = {
  svgHeight: 5000,
  svgWidth: 5000,
}

export const renderVisualizationWithSettings = () => {
  renderVisualization(d3.select('svg'), d3.select('.container'), config.svgWidth, config.svgHeight, "trump.json");
}

renderCanvass(config);
renderVisualizationWithSettings();
prepareControlPanel(config);
//
// setTimeout(() => {
//   introJs.introJs().setOptions({
//     exitOnOverlayClick: true,
//     showStepNumbers: false,
//     showProgress: true,
//     hideNext: true,
//     hidePrev: true,
//     steps: [
//       {intro: "<div style='font-size:15px;'><h3><b>Journalist Graph</b></h3>This visualization depicts relationships between people and media outlets. See <b><a target='_blank' href='https://medium.com/questions-on-the-future-of-media/56-what-is-the-interplay-between-the-brand-of-a-journalist-and-that-of-a-media-institution-fe31628b8af2'>my blog post</a></b> on this concept.<br><br>This is a work in progress, so please send me feedback at <b>tomerbovadia@gmail.com</b>. <br><br>May I take you on a tour?<br><br><i>-Tomer Ovadia</i><br><br></div>"},
//       {
//         intro: '<b>Large circles</b> are <b>media outlets</b>.',
//         element: document.querySelector('#PoliticoPublication')
//       },
//       {
//         intro: '<b>Small circles</b> are <b>people</b>.',
//         element: document.querySelector('#GlennThrushNode')
//       },
//       {
//         intro: '<b>Solid, short lines</b> connect people to their <b><i>current</i> media outlets</b>.',
//         element: document.querySelector('#JakeShermanPoliticoLink')
//       },
//       {
//         intro: '<b>Dashed, long lines</b> connect people to their <b><i>former</i> media outlets</b>.',
//         element: document.querySelector('#JamesHohmannPoliticoLink')
//       },
//       {intro: "That should be enough to get you started. Enjoy!"},
//     ]
//   }).start();
// }, 2000)
