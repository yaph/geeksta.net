const radius = 300,
    stroke = 5,
    width = (radius + stroke) * 2,
    svg = d3.select('#canvas').append('svg')
        .attr('width', width)
        .attr('height', width);

const g = svg.append('g')
    .attr('transform', `translate(${stroke}, ${stroke})`);

g.append('clipPath').attr('id', 'clip').append('rect')
    .attr('width', radius)
    .attr('height', radius * 2);

// outline
g.append('circle')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', radius)
    .attr('stroke', 'black')
    .attr('stroke-width', stroke);

// large white circle
g.append('circle')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', radius)
    .attr('fill', 'white')
    .attr('clip-path', 'url(#clip)');

// inner white circle
g.append('circle')
    .attr('cx', radius)
    .attr('cy', radius * 0.5)
    .attr('r', radius * 0.5)
    .attr('fill', 'white');

// black seed
g.append('circle')
    .attr('cx', radius)
    .attr('cy', radius * 0.5)
    .attr('r', radius * 0.15);

// inner black circle
g.append('circle')
    .attr('cx', radius)
    .attr('cy', radius * 1.5)
    .attr('r', radius * 0.5);

// white seed
g.append('circle')
    .attr('cx', radius)
    .attr('cy', radius * 1.5)
    .attr('r', radius * 0.15)
    .attr('fill', 'white');