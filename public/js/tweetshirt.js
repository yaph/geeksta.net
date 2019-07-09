$(function(){

  var loadTweets = function(input, searchkey){

    var username = null, query = null;
    if (searchkey === 'searchterms') {
      query = input;
    } else {
      username = input;
    }

    $(".tweet").tweet({
      username: username,
      query: query,
      avatar_size: 48,
      count: 10,
      retweets: false,
      loading_text: 'loading tweets...',
      template: '{avatar}{text}{join}{time}'
    });
  }

  var update = function(params){
    $('#shirt').html(z3l.getProductHTML(
      '/api/create/at-238355915198956003?rf=238355915198956003&ax=Linkover&pd=235859552074883586&fwd=ProductPage&ed=true&tc=&ic=',
      'http://rlv.zcache.com/tweet_from_twitter_user_shirt-r906cf28e92a745ab9ce8a655b4b242ba_f0cjc_325.jpg',
      'Tweet from Twitter User Shirt',
      params));
  };

  var ts = $('#tweetsearch');
  var tsin = $('#tweetsearchinput');
  var tskey = $('input[name=searchkey]:radio');

  ts.submit(function(e){
    e.preventDefault();
    var searchkey = $('#searchterms').attr('checked') ? 'searchterms' : 'username';
    loadTweets(tsin.val(), searchkey);
  });

  var user = null;
  if (document.location.hash) {
    user = encodeURIComponent(document.location.hash.split('/').pop());
  }

  if (user) tsin.val(user);
  else tsin.val('DevOps_Borat');
  ts.trigger('submit');

  z3l.init('geeksta', 'AIzaSyB75IDBFMpF9DsLFbDVwVY0Kzn9CIBBQhY');
  update([]);

  $('.tweet').on('click', function(e){
    e.preventDefault();

    var text = '';
    var user = tsin.val();
    var t = $(e.target);

    if (t.is('a')) {
      if (t.parent('span').hasClass('tweet_time')) document.location.href = t.attr('href');
      t.removeAttr('href').removeAttr('title');
    }
    if (t.is('li')) {
      text = t.find('.tweet_text').text();
      user = t.find('.tweet_avatar').attr('href').replace('http://twitter.com/', '');
    } else {
      var p = t.parents('ul.tweet_list li');
      text = p.find('.tweet_text').text();
      user = p.find('.tweet_avatar').attr('href').replace('http://twitter.com/', '');
    }
    if (text) {
      update([{'name': 'twitteruser', 'value': '@' + user},
        {'name': 'tweettext', 'value': text}]);
    }
  });
});