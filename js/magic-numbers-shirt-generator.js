"use strict";function setNum(t){var e="http://www.zazzle.com/api/create/at-238355915198956003?rf=238355915198956003&ax=Linkover&pd=235536210905157788&fwd=ProductPage&ed=true&tc=gkst&ic=&t_num_txt="+t,i="http://rlv.zcache.com/magic_number_0x8badf00d_for_programmers_and_geeks_t_shirt-r5192ee59fc9641afb0730113a6ebd4d0_k2gr0_512.jpg?t_num_txt="+t,a=$("#num-"+t),n=$("#shirt");$("#magic-numbers").find("i").addClass("fa-toggle-off").removeClass("fa-toggle-on"),a.find("i").toggleClass("fa-toggle-off").toggleClass("fa-toggle-on"),n.find("a").attr("href",e),n.find("img").attr("src",i),n.find("p").text(a.find("p").text()),n.find(".magic-number").text(a.find("h4").text())}window.onload=function(){var t=$("#magic-numbers"),e=t.find("div:first-child h4").text().trim();setNum(e),t.find("h4").click(function(t){setNum(t.target.textContent.trim())})};