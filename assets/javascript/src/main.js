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

var BREAK_POINT = 721;

if( $(window).width() >= BREAK_POINT ){
	$('body').removeClass('no-js');
	site = new Site();
} else {
	site = new SimpleSite();
}

$(window).on('resize', function(){
	// if( site.type === 'full' ){
	// 	return false;
	// }
	if( $(window).width() > BREAK_POINT ){
		if( site.type !== 'full' ){
			site.destroy();
	 		$('body').removeClass('no-js');
	 		site = new Site();
		}
	} else {
		if( site.type === 'full' ){
			site.destroy();
			$('body').addClass('no-js');
			site = new SimpleSite();
		}
	}
});
