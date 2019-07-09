var fontSize = d3.scale.log().range([-15, 15]),
    w = 1200,
    h= 800;

function genCloud(browser) {
  var curr_browser = $('#'+browser);
  if (curr_browser.hasClass('disabled')) return;
  $('#vis').empty();
  $('#browser_buttons .btn.disabled').removeClass('disabled');
  curr_browser.addClass('disabled');
  d3.layout.cloud().size([w, h])
    .words(browsers[browser].map(function(d) {
      return {text: d[0], size: d[1]};
    }))
    .fontSize(function(d) { return fontSize(d.size); })
    .on('end', draw)
    .start();
  function draw(words) {
    d3.select('#vis').append('svg')
        .attr('width', w)
        .attr('height', h)
      .append('g').attr('transform', 'translate(600,400)')
      .selectAll('text').data(words)
      .enter().append('text')
        .style('font-size', function(d) { return d.size + 'px'; })
        // make sure colors are not lighter than EEEEEE
        .style('fill', function(d) { return '#'+(Math.random()*0xEEEEEE<<0).toString(16); })
        .attr('text-anchor', 'middle')
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        }).text(function(d) { return d.text; });
  }
}
$(function(){
  genCloud('ie');
  $('#browser_buttons .btn').click(function(evt){
    genCloud(this.id);
  });
});