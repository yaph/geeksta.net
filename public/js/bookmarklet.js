$('.bookmarklet textarea').hide();
$('.bookmarklet a').each(function(){
this.href=$('.bookmarklet textarea')[0].textContent;
});