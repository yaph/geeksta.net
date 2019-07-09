$(function(){
  var update = function(){
    $('#shirt').html(z3l.getProductHTML(
      '/api/create/at-238355915198956003?rf=238355915198956003&ax=Linkover&pd=235504152614532318&fwd=ProductPage&ed=true&tc=gkst&ic=',
      'http://rlv.zcache.com/leetspeak_black_t_shirt-re19f89c1b65d4ef0840e5c48095dad5d_k2gm8_512.jpg',
      'leetspeak T-Shirt Dark',
      [{'name': 'leetspeak', 'value': $('textarea')[1].value}]));
  };

  z3l.init('geeksta', 'AIzaSyB75IDBFMpF9DsLFbDVwVY0Kzn9CIBBQhY');
  var input = $($('textarea')[0]);
  input.val('This is leetspeak');
  input.trigger('change');
  update();

  $('.digit').on('click', update);
  $('textarea').bind('input', update);
  $('table tr > td').on('click', update);
});