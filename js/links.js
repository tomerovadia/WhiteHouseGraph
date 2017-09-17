const d3 = require('d3');

export const prepareLinkData = (data, getClusterData, peopleObject) => {
  return createCurrentEmploymentLinks(data.people, getClusterData)
                .concat(createPreviousEmploymentsLinks(data.employments, getClusterData));
}

export const appendLinks = (visualization, linkData, peopleObject) => {
  const links = visualization.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(linkData)
    .enter().append("line")
      .attr("stroke-width", calculateStrokeWidth)
      .attr('class', calculateStrokeType)
      .style("stroke", (d) => d.color)
      .style('stroke-opacity', (d) => {
        return peopleObject[d.source].institution ? 1 : 0.2;
      })
      .attr('id', (d) => {
        return `${d.source.split(' ').join('')}${d.target.split(' ').join('')}Link`;
      });

    return links;
}

const createCurrentEmploymentLinks = (people, getClusterData) => {
  return people.map((person) => {
    if(!person.institution) return null;
    return {
      source: person.id,
      target: person.institution,
      value: 30,
      color: getClusterData(person.institution).color,
      current: true,
    };
  }).filter((object) => object);
}


const createPreviousEmploymentsLinks = (employments, getClusterData) => {
  return employments.map((employment) => {
    return {
      source: employment.person,
      target: employment.institution,
      value: 55,
      color: getClusterData(employment.institution).color,
      current: false,
    };
  })
}

const calculateStrokeWidth = (d) => {
  return d.value > 40 ? 1.5 : 2.5;
}

const calculateStrokeType = (d) => {
  return d.value > 40 ? 'dashed' : 'solid';
}

export const prepareIntraInstitutionLinkData = (data) => {
  const intraInstitutionLinkData = [];
  const institutions = data.institutions;

  for(let i=0; i < institutions.length; i++){
    let institution = institutions[i];
    if(institution.cluster){
      for(let j=i+1; j < institutions.length; j++){
        let otherInstitution = institutions[j];
        const institutionCluster = institution.cluster;
        const otherInstitutionCluster = otherInstitution.cluster;
        if(otherInstitutionCluster && (institutionCluster === otherInstitutionCluster)){
          intraInstitutionLinkData.push({
            source: institution,
            target: otherInstitution,
            value: 80,
          });
        }
      }
    }
  }

  return intraInstitutionLinkData;
}


export const appendIntraInstitutionLinks = (visualization, intraInstitutionLinkData) => {

  return visualization.append("g")
        .attr("class", "intraInstitutionLinks")
      .selectAll("line.intraInstitution")
      .data(intraInstitutionLinkData)
      .enter()
      .append("line")
        .classed("intraInstitutionLink", true)
}
