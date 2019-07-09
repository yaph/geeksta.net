google.load('feeds', '1');

var sources = [];
var url = 'http://www.google.com/reader/public/atom/user%2F06178999268132965789%2Fbundle%2FData%20Vis';
var rehost = new RegExp(/^.*?:\/\/([^/]+)\/.*$/);
var carousel = $($('#visgal .carousel-inner')[0]);
var links = $('#visgal-links');

function initialize() {
    var feed = new google.feeds.Feed(url);
    feed.setNumEntries(20);
    feed.load(function(result) {
        if (!result.error) {
            var container = document.getElementById('visgal');
            for (var i = 0; i < result.feed.entries.length; i++) {
                var item = result.feed.entries[i];
                $(item['content']).find('img').each(function(idx, img){
                    var i = $(img);
console.log(i);
                    if (i.attr('width') > 150 && i.attr('src')) {
                        var url = item.link;
                        carousel.append('<div class="item"><img src="' + 
                            i.attr('src') + '"><div class="carousel-caption"><h4><a href="' + url + '">' +
                            item.title + '</a></h4><p>' + item.contentSnippet + '</p></div></div>'
                        );
                        var h = url.replace(rehost, "$1");
                        if (-1 === sources.indexOf(h)) sources.push(h);
                    }
                });
            }
            sources.sort();
            for (i in sources) {
                links.append('<a href=http://"' + sources[i] + '">' + sources[i] + '</a><br>');
            }
            $(carousel.find('.item')[0]).addClass('active');
            $('#visgal').carousel({interval: 8000});
        }
    });
}
google.setOnLoadCallback(initialize);

