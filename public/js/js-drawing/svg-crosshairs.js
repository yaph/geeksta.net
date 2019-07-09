var w = 600,
    h = 600,
    f = 'none',
    s = '#000000',
    so = 1,
    sw = '20px',
    svg = d3.select('#canvas').append('svg')
        .attr('width', w)
        .attr('height', h);

svg.append('circle')
    .attr('cx', w / 2)
    .attr('cy', h / 2)
    .attr('r', 240)
    .style('fill', f)
    .style('stroke', s)
    .style('stroke-opacity', so)
    .style('stroke-width', sw);

svg.append('circle')
    .attr('cx', w / 2)
    .attr('cy', h / 2)
    .attr('r', 60)
    .style('fill', f)
    .style('stroke', s)
    .style('stroke-opacity', so)
    .style('stroke-width', sw);

svg.append('line')
    .attr('x1', w / 2)
    .attr('y1', 0)
    .attr('x2', w / 2)
    .attr('y2', h)
    .style('stroke', s)
    .style('stroke-opacity', so)
    .style('stroke-width', sw);

svg.append('line')
    .attr('x1', 0)
    .attr('y1', h / 2)
    .attr('x2', w)
    .attr('y2', h / 2)
    .style('stroke', s)
    .style('stroke-opacity', so)
    .style('stroke-width', sw);