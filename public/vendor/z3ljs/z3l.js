var z3l = {
  tld: 'com',
  cctldmap: {
    'at':'at',
    'be':'be',
    'ca':'ca',
    'ch':'ch',
    'de':'de',
    'es':'es',
    'fr':'fr',
    'nl':'nl',
    'pt':'pt',
    'se':'se',
    'au':'com.au',
    'br':'com.br',
    'jp':'co.jp',
    'kr':'co.kr',
    'nz':'co.nz',
    'uk':'co.uk',
    'us':'com'
  },
  init: function(storename, apikey) {
    z3l.storename = storename;
    if ('undefined' !== typeof apikey) {
      var script = document.createElement('script');
      script.src = 'http://www.google.com/jsapi?key=' + apikey + '&callback=z3l.loadMaps';
      script.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },
  loadMaps: function() {
    google.load('maps', '3', {'callback': 'z3l.mapsLoaded', 'other_params':'sensor=false'});
  },
  mapsLoaded: function() {
    if (google.loader.ClientLocation) {
      if (visitor_cc = google.loader.ClientLocation.address.country_code) {
        var cc = visitor_cc.toLowerCase();
        if ('undefined' !== typeof z3l.cctldmap[cc]) z3l.tld = z3l.cctldmap[cc];
      }
    }
  },
  getBase: function() {
    return 'http://www.zazzle.' + z3l.tld;
  },
  tplProduct: function(href, src, name) {
    return '<div class="z3lproduct"><a href="' + href + '"><img src="' + src +
      '" alt="' + name + '"><br>' + name + '</a></div>';
  },
  getProductHTML: function(path, imgurl, name, params) {
    var href = z3l.getBase() + path;
    var src = imgurl + '?bg=0xffffff';
    if (params && params.length > 0) {
      for (i in params) {
        var p = params[i];
        href += '&' + p.name + '=' + encodeURIComponent(p.value);
        src += '&t_' + p.name + '=' + encodeURIComponent(p.value);
      }
    }
    return z3l.tplProduct(href, src, name);
  }
};
