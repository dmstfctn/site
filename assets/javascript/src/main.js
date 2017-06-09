var $ = require( 'jquery' );

var Slideshow = require('./modules/Slideshow.js');
var HoverImg = require('./modules/HoverImg.js');
var Video = require('./modules/Video.js');

var Site = require( './modules/Site' );
var site = false;
var slideshows = [];
var hoverImgs = [];
var videos = [];

if( $(window).width() > 640 ){
	$('body').removeClass('no-js');
	site = new Site();
} else {
	$('.dc-slideshow').each(function(){
		slideshows.push( new Slideshow( $(this) ) );
	});

	$('.dc-hoverimg-img').each(function(){
		hoverImgs.push( new HoverImg( $(this) ) );
	});

	$('.dc-video').each(function(){
		videos.push( new Video( $(this) ) );
	});
}


 $(window).on('resize', function(){
	 if( site ){
		 return false;
	 }
	 if( $(window).width() > 640 ){
	 	$('body').removeClass('no-js');
	 	site = new Site();
	 }
 })
