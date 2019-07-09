var Gallery = {

    gallery: null,
    focus_container: null,
    active: null,
    list:[],

    init: function(){
        Gallery.gallery = $('#gallery');
        Gallery.list = Gallery.gallery.find('li');
        Gallery.create();

        var first = $(Gallery.list[0]);
        Gallery.focus(first);
        Gallery.attach();
    },

    create: function(){
        $(Gallery.gallery).parent().prepend('<div id="gallery_wrapper">')
        var wrapper = $('#gallery_wrapper');
        wrapper.append('<div id="gallery_focus">');
        wrapper.append(Gallery.gallery);
        Gallery.focus_container = $('#gallery_focus');
    },

    focus: function(li){
        Gallery.active && Gallery.active.show();
        Gallery.active = li;
        li.hide();
        var h = li.find('h3').html();
        var a = li.find('a');
        var src = a.attr('href');
        var img = li.find('img');
        var alt = img.attr('alt');
        Gallery.focus_container.html('<h2>'+h+'</h2><div><img src="'+src+'" alt="'+alt+'">'
            + '<p>' + li.find('p.description').html() + '</p>'
            + '<a href="' + li.find('a.large').attr('href') + '"></a>'
            + '</div>'
            );
    },

    attach: function(){
        Gallery.list.each(function(idx,val){
            $(val).click(function(){
                Gallery.focus($(this));
                return false;
            });
        });
        Gallery.focus_container.click(function(idx,val){
            var src = $(this).find('a').attr('href');
            var img = $(this).find('img');
            img.attr('src', src);
            Gallery.overlay();
            $('#darkbox').html(Gallery.focus_container.html());
            $('#darkbox').prepend('<div id="darkbox_nav"><a onclick="Gallery.overlayClose();" href="#">close</a></div>');
        });
    },

    overlay: function(){
        $('body').append('<div id="darkbox" class="fg_overlay"></div><div class="bg_overlay"></div>');

        $(document).keyup(function(e) {
            e.keyCode == 27 && Gallery.overlayClose();
        });
    },

    overlayClose: function(){
        $('.fg_overlay, .bg_overlay').remove();
    }

};

jQuery(document).ready(function($) {Gallery.init()});
