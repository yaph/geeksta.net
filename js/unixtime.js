$(function(){
  var dateToUts = function(){
    var d = document.date;
    return Date.UTC(
      d.year.value, d.month.value-1, d.day.value, d.hour.value, d.minute.value, d.sec.value
    ) / 1000.0;
  };

  var update = function(){
    $('#shirt').html(z3l.getProductHTML(
      '/api/create/at-238355915198956003?rf=238355915198956003&ax=Linkover&pd=235934790893325513&fwd=ProductPage&ed=true&tc=gkst&ic=',
      'https://rlv.zcache.com/born_at_unix_time_basic_dark_t_shirt-r96f6037456404e76bb32c5baf2487327_k2gm8_512.jpg',
      'Born at Unix Time',
      [{'name': 'uts', 'value': dateToUts()}]));
  };

  z3l.init('geeksta', 'AIzaSyB75IDBFMpF9DsLFbDVwVY0Kzn9CIBBQhY');
  update();
  $('#calculate').on('click', update);
});
