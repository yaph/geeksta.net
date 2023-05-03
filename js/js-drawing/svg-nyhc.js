const w = 600,
    h = 600,
    h_rect = 30,
    l_cath = h_rect / 2,
    offset = Math.sqrt(Math.pow(l_cath, 2) + Math.pow(l_cath, 2)),
    fg = '#ffffff',
    bg = '#000000',
    svg = d3.select('#canvas').append('svg')
        .attr('width', w)
        .attr('height', h);

function textStyle(text) {
    text.attr('text-anchor', 'middle')
        .attr('font-family', 'sans')
        .attr('font-size', '220px')
        .attr('font-weight', 600)
        .attr('fill', fg);
}

svg.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', w)
    .attr('height', h)
    .style('fill', bg)
    .style('opacity', 1)

svg.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', Math.sqrt(Math.pow(w - offset, 2) + Math.pow(h - offset, 2)))
    .attr('height', h_rect)
    .style('fill', fg)
    .attr('transform', 'translate(' + offset + ',0)rotate(45)');

svg.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', Math.sqrt(Math.pow(w - offset, 2) + Math.pow(h - offset, 2)))
    .attr('height', h_rect)
    .style('fill', fg)
    .attr('transform', 'translate(0,' + (h - offset) + ')rotate(-45)');

svg.append('text')
    .attr('x', w / 2)
    .attr('y', 165)
    .text('N')
    .call(textStyle);

svg.append('text')
    .attr('x', w / 2)
    .attr('y', 596)
    .text('Y')
    .call(textStyle);

svg.append('text')
    .attr('x', 75)
    .attr('y', 380)
    .text('H')
    .call(textStyle);

svg.append('text')
    .attr('x', 525)
    .attr('y', 380)
    .text('C')
    .call(textStyle);