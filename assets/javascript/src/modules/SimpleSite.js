var $ = require( 'jquery' );
var fitVids = require( '../lib/fitVids' )( $ )

var HoverImg = require('./HoverImg.js' );
var Slideshow = require('./Slideshow.js' );
var Video = require('./Video.js' );

var SimpleSite = function(){
	var that = this;
	this.type = 'simple';
	this.$body = $('body');
	this.slideshows = [];
	this.hoverImgs = [];
	this.videos = [];


	$('.dc-slideshow').each(function(){
		that.slideshows.push( new Slideshow( $(this) ) );
	});

	$('.dc-hoverimg-img').each(function(){
		that.hoverImgs.push( new HoverImg( $(this) ) );
	});

	$('.dc-video').each(function(){
		that.videos.push( new Video( $(this) ) );
	});

	$('.wysiwyg').fitVids();

	if( this.$body.hasClass('home') ){
		this.homeFunctionality();
	}
}

var proto = SimpleSite.prototype;

proto.homeFunctionality = function(){
	// var $paneNE = $('#pane-network-ensemble');
	// $('.committee-header').addClass('invert');
	// $('.layer__themes').on('scroll', function(){
	// 	if( $paneNE.offset().top <= 24 ){
	// 		$('.committee-header').removeClass('invert');
	// 	} else {
	// 		$('.committee-header').addClass('invert');
	// 	}
	// });
	 $('.theme--leader').click(function(){
		 console.log( 'click' );
		 $('.tabs--top-theme').removeClass('tabs--top-theme');
		 $(this).closest('.theme').addClass('tabs--top-theme');
	 })
	$('.committee-header').addClass('invert');
}

proto.destroy = function(){
	this.slideshows = [];
	this.hoverImgs = [];
	this.videos = [];
}


module.exports = SimpleSite;
