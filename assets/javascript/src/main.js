var $ = require( 'jquery' );

var Slideshow = require('./modules/Slideshow.js');
var HoverImg = require('./modules/HoverImg.js');
var Video = require('./modules/Video.js');

var SimpleSite = require( './modules/SimpleSite' );
var Site = require( './modules/Site' );
var site = false;
var slideshows = [];
var hoverImgs = [];
var videos = [];

if( $(window).width() > 640 ){
	$('body').removeClass('no-js');
	site = new Site();
} else {
	site = new SimpleSite();
}

$(window).on('resize', function(){
	console.log('WINDOW RESIZE')
	if( site.type === 'full' ){
		return false;
	}
	if( $(window).width() > 640 ){
		site.destroy();
	 	$('body').removeClass('no-js');
	 	site = new Site();
	 }
});
