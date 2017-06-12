var $ = require( 'jquery' );
var fitVids = require( '../lib/fitVids' )( $ )

var HoverImg = require('./HoverImg.js' );
var Slideshow = require('./Slideshow.js' );
var Video = require('./Video.js' );
var CollapsiblePanel = require('./CollapsiblePanel.js');

var ID = 0;

var SimpleSite = function(){
	var that = this;
	this.type = 'simple';
	this.$body = $('body');
	this.slideshows = [];
	this.hoverImgs = [];
	this.videos = [];
	this.panels = []

	this.namespace = 'SimpleSite-' + ID;
	ID++;

	$('.dc-slideshow').each(function(){
		that.slideshows.push( new Slideshow( $(this) ) );
	});

	$('.dc-hoverimg-img').each(function(){
		that.hoverImgs.push( new HoverImg( $(this) ) );
	});

	$('.dc-video').each(function(){
		that.videos.push( new Video( $(this) ) );
	});

	$('.collapsible-panel').each(function(){
		that.panels.push( new CollapsiblePanel( $(this) ) );
	});

	$('.wysiwyg').fitVids();

	if( this.$body.hasClass('home') ){
		this.homeFunctionality();
	}
}

var proto = SimpleSite.prototype;

proto.homeFunctionality = function(){
	 $('.theme--leader').on( 'click.' + this.namespace, function(){
		 $('.tabs--top-theme').removeClass('tabs--top-theme');
		 $(this).closest('.theme').addClass('tabs--top-theme');
	 })
	$('.committee-header').addClass('invert');
}

proto.destroy = function(){
	$('.theme--leader').off( 'click.' + this.namespace );
	this.slideshows = [];
	this.hoverImgs = [];
	this.videos = [];
	this.panels = [];
}


module.exports = SimpleSite;
