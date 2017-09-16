const d3 = require('d3');

export const prepareLinkData = (data, getClusterData) => {
  return createCurrentEmploymentLinks(data.people, getClusterData)
                .concat(createPreviousEmploymentsLinks(data.employments, getClusterData));
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
      value: 80,
      color: getClusterData(employment.institution).color,
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
            value: 60,
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
