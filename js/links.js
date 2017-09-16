const d3 = require('d3');

export const prepareLinkData = (data, institutionColors) => {
  return createCurrentEmploymentLinks(data.people, institutionColors)
                .concat(createPreviousEmploymentsLinks(data.employments, institutionColors));
}

export const appendLinks = (visualization, linkData) => {
  const links = visualization.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(linkData)
    .enter().append("line")
      .attr("stroke-width", calculateStrokeWidth)
      .attr('class', calculateStrokeType)
      .style("stroke", (d) => d.color)
      .attr('id', (d) => {
        return `${d.source.split(' ').join('')}${d.target.split(' ').join('')}Link`;
      });

    return links;
}


const createCurrentEmploymentLinks = (people, institutionColors) => {
  return people.map((person) => {
    if(!person.institution) return null;
    return {
      source: person.id,
      target: person.institution,
      value: 30,
      color: institutionColors[person.institution],
      current: true,
    };
  }).filter((object) => object);
}


const createPreviousEmploymentsLinks = (employments, institutionColors) => {
  return employments.map((employment) => {
    return {
      source: employment.person,
      target: employment.institution,
      value: 80,
      color: institutionColors[employment.institution],
      current: false,
    };
  })
}

const calculateStrokeWidth = (d) => {
  return d.value > 60 ? 1 : 3;
}

const calculateStrokeType = (d) => {
  return d.value > 60 ? 'dashed' : 'solid';
}
