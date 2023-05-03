const fontSize = d3.scale.log().range([-15, 15]),
    w = 1200,
    h = 800;

function genCloud(browser) {
  const curr_browser = document.getElementById(browser);
  if (curr_browser.classList.contains('dark')) return;
  document.getElementById('vis').innerHTML = '';
  document.querySelectorAll('#browser_buttons .button.dark').forEach(elt => elt.classList.remove('dark'));
  curr_browser.classList.add('dark');
  d3.layout.cloud().size([w, h])
    .words(browsers[browser].map(d => Object({text: d[0], size: d[1]})))
    .fontSize(d => fontSize(d.size))
    .on('end', draw)
    .start();
  function draw(words) {
    d3.select('#vis').append('svg')
        .attr('width', w)
        .attr('height', h)
      .append('g').attr('transform', 'translate(600,400)')
      .selectAll('text').data(words)
      .enter().append('text')
        .style('font-size', d => d.size + 'px')
        // make sure colors are not lighter than EEEEEE
        .style('fill', d => '#'+(Math.random()*0xEEEEEE<<0).toString(16))
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
  }
}

window.onload = function() {
  genCloud('ie');
  document.querySelectorAll('#browser_buttons .button').forEach(elt => {
    elt.addEventListener('click', () => genCloud(elt.id));
  });
}