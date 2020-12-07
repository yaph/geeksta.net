jQuery(function($){
    var sources = [];
    var links = $('#visgal-links');
    var rehost = new RegExp(/^.*?:\/\/([^/]+)\/.*$/);
    var carousel = $($('#visgal .carousel-inner')[0]);
    var url = 'http://pipes.yahoo.com/pipes/pipe.run?_id=41c7e92f84008616afcf126125128803&_render=json';
    $.getJSON(url, function(data) {
        $.each(data.value.items, function(idx, item){
            $(item['content:encoded']).find('img').each(function(idx, img){
                var i = $(img);
                if (i.attr('width') > 300 && i.attr('src')) {
                    var url = item['feedburner:origLink'] ?
                        item['feedburner:origLink'] : item.link;

                    carousel.append('<div class="item"><img src="' +
                        i.attr('src') + '"><div class="carousel-caption"><h4><a href="' + url + '">' +
                        item.title + '</a></h4><p>' + item.description + '</p></div></div>'
                    );
                    var h = url.replace(rehost, "$1");
                    if (-1 === sources.indexOf(h)) sources.push(h);
                }
            });
        });
        sources.sort();
        for (i in sources) {
            links.append('<a href=http://"' + sources[i] + '">' + sources[i] + '</a><br>');
        }
        $(carousel.find('.item')[0]).addClass('active');
        $('#visgal').carousel({interval: 6000});
    });
});

// https://www.google.com/reader/public/atom/user%2F06178999268132965789%2Fbundle%2FData%20Vis
