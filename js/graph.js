const d3 = require('d3');
import { appendinstitutions } from './institutions.js';
import { appendPeople } from './people.js';
import { appendLinks, prepareLinkData, prepareIntraInstitutionLinkData, appendIntraInstitutionLinks } from './links.js';

const arrayToObject = (array, key) => {
  const object = {};

  array.forEach((el) => {
    object[el[key]] = el;
  })

  return object;
}

const ticked = (institutions, links, nodes) => {
  return () => {
    institutions
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" });

    links
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    nodes
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" });
  }

}

export const renderVisualization = (svg, container, width, height, data_file) => {

  const visualization = d3.select('.visualization');

  d3.json(data_file, function(error, graph) {

    if (error) throw error;

    const institutionsObject = arrayToObject(graph.institutions, 'id');
    const clustersObject = arrayToObject(graph.clusters, 'id');
    const employmentsObject = arrayToObject(graph.employments, 'person');
    const peopleObject = arrayToObject(graph.people, 'id');

    const getClusterData = (institution) => {
      return clustersObject[institutionsObject[institution].cluster];
    }

    const institutions = appendinstitutions(svg, visualization, graph, width, height, clustersObject);

    const linkData = prepareLinkData(graph, getClusterData);
    const links = appendLinks(visualization, linkData, peopleObject);

    const intraInstitutionLinkData = prepareIntraInstitutionLinkData(graph);
    const intraInstitutionLinks = appendIntraInstitutionLinks(visualization, intraInstitutionLinkData);

    const nodes = appendPeople(visualization, graph, width, height, employmentsObject, getClusterData);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }) )
        .force("charge", d3.forceManyBody()
          .strength((d) => {
            return d.id === 'White House' ? -15000 : -7000;
          })
          .distanceMin(15) )
        .force("center", d3.forceCenter(width/2 + 200, height/2 - 100) );

    nodes
      .call(d3.drag()
          .on("start", nodedragstarted)
          .on("drag", nodedragged)
          .on("end", nodedragended));

    institutions
      .call(d3.drag()
          .on("start", nodedragstarted)
          .on("drag", nodedragged)
          .on("end", nodedragended));

    simulation
        .nodes(graph.people.concat(graph.institutions))
        .on("tick", ticked(institutions, links, nodes));

    simulation.
      force("collide", d3.forceCollide()
                          .radius(30)
                          .iterations(2))

    simulation
        .force("link")
        .links(linkData.concat(intraInstitutionLinkData))
        .distance((d) => d.value)
        .strength((d) => d.current === true ? 8 : 6);

    simulation.alpha(0.1)
    simulation.alphaDecay(0.008)

    function nodedragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.01).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function nodedragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function nodedragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  });

}
