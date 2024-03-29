const w = 800,
    h = w,
    font_scale = w / 8.08,
    star_scale = font_scale / 2.1,
    stroke_width = (w / 50),
    inner_circle = (w / 2) - font_scale,
    outer_circle = (w / 2),
    fgcolor = '#ffffff',
    symbol = '٭',
    symbol_count = 50,
    text = 'ERICH ★ RICHARD ★ RALPH ★ JOHN ★',
    translate = 'translate(' + w / 2 +',' + h / 2 + ')';

const svg = d3.select('#canvas').append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('style', 'background: #000')

// Create arcs for drawing paths.
const inner_arc = d3.arc()
    .innerRadius(inner_circle)
    .outerRadius(inner_circle)
    .startAngle(0)
    .endAngle(360);

const outer_arc = d3.arc()
    .innerRadius(outer_circle - stroke_width)
    .outerRadius(outer_circle)
    .startAngle(0)
    .endAngle(360);

// Create paths for aligning texts, and showing the outer circle.
svg.append('path')
    .attr('d', inner_arc)
    .attr('id', 'inner-circle')
    .attr('transform', translate);

svg.append('path')
    .attr('d', outer_arc)
    .attr('id', 'outer-circle')
    .attr('transform', translate)
    .attr('fill', fgcolor);

// Create text elements that will be put on the circular paths.
const text_names = svg.append('text')
    .attr('x', 0)
    .attr('dy', 0)
    .style('font-size', font_scale + 'px')
    .style('font-family', 'Times New Roman');;

const text_stars = svg.append('text')
    .attr('x', 0)
    .attr('dy', stroke_width * 2)
    .style('font-size', star_scale + 'px');

// Add the first names of the GOF authors.
text_names.append('textPath')
    .attr('fill', fgcolor)
    .attr('xlink:href','#inner-circle')
    .text(text)

// Add the stars below the names.
text_stars.append('textPath')
    .attr('fill', fgcolor)
    .attr('xlink:href','#inner-circle')
    .text(Array(symbol_count).join(symbol + ' '));