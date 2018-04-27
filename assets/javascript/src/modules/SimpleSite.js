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


	if( this.$body.hasClass('home') ){
		//this.loadAbout( function(){
			that.init();
			that.initTabs();
			if( window.location.hash === '#networks' ){
				$('.theme__networks .theme--leader a').click();
			} else if( window.location.hash === '#offshore' ){
				$('.theme:not(.theme__networks) .theme--leader a').click();
			}
		//});
	} else if( this.$body.hasClass('page-template-page-about') ){
		$('.about-fake-tabs').find('h1').unwrap('a');
		this.loadHome(function(){
			that.init();
			that.initTabs();
		});
	} else {
		that.init();
	}
}

var proto = SimpleSite.prototype;

proto.init = function(){
	var that = this;
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
	//$('.dc-video').fitVids();
}

proto.loadAbout = function( callback ){
	var that = this;
	$.get('/mmittee/about', function( data ){
		var $content = $(data).filter('.dc-site-contents').find('.layer__committee').html();
		$('.layer__committee').html( $content );
		if( typeof callback === 'function' ){
			callback();
		}
	})
};

proto.loadHome = function( callback ){
	var that = this;
	$.get('/mmittee', function( data ){
		var $content = $(data).filter('.dc-site-contents').find('.layer__themes').html();
		$('.layer__themes').html( $content );
		if( typeof callback === 'function' ){
			callback();
		}
	})
}

proto.initTabs = function(){
	 $('.theme--leader').on( 'click.' + this.namespace, function( e ){
		 e.preventDefault();
		 $('.tabs--top-theme').removeClass('tabs--top-theme');
		 if( $(this).closest('.theme').hasClass('theme__networks') ){
			 $('.layer__themes').find('.theme__networks').addClass('tabs--top-theme');
		 } else {
			 $('.layer__themes').find('.theme__offshore').addClass('tabs--top-theme');
		 }
	 });
	 $('.committee-header a').on( 'click.' + this.namespace, function( e ){
		 e.preventDefault();
		 $('.tabs--top-theme').removeClass('tabs--top-theme');
		 $('.layer__committee').addClass('tabs--top-theme');
	 });
}

proto.destroy = function(){
	$('.theme--leader').off( 'click.' + this.namespace );
	$('.committee-header a').off( 'click.' + this.namespace );
	this.slideshows = [];
	this.hoverImgs = [];
	this.videos = [];
	this.panels = [];
}


module.exports = SimpleSite;
