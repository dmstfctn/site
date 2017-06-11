var $ = require( 'jquery' );
var fitVids = require( '../lib/fitVids' )( $ );
var Handle = require( './Handle.js' );
var Pane = require( './Pane.js' );
var Project = require( './Project.js' );
var Post = require( './Post.js' );
var About = require( './About.js' );
var HoverImg = require('./HoverImg.js' );
var Loader = require('./Loader.js' );
var Slideshow = require('./Slideshow.js' );
var Video = require('./Video.js' );


var Site = function(){
	this.type = 'full';
	this.project = null;
	this.post = null;
	this.about = null;
	this.slideshows = [];
	this.hoverImgs = [];
	this.videos = [];

	this.firstTime = true;

	this.pWinW = $(window).width();
	this.pWinH = $(window).height();

	this.setupLoader();

	this.addListeners();
}

var proto = Site.prototype;

proto.setupPanes = function(){
	if( this.paneLeft ){
		this.paneLeft.destroy();
	}
	if( this.paneRight ){
		this.paneRight.destroy();
	}
	this.paneLeft = new Pane( $('.theme:first-child') );
	this.paneRight = new Pane( $('.theme:nth-child(2)') );
}

proto.setupHandles = function(){
	this.handleX = new Handle( '#handle-x', { x: true } );
	this.handleY = new Handle( '#handle-y', { y: true } );

	this.handleX.setConstraints({
		x: {
			min: this.paneLeft.minWidth,
			max: this.paneLeft.maxWidth
		},
		y: {
			min: 0,
			max: $(window).width()
		}
	});
	this.handleY.setConstraints({
		x: {
			min: 0,
			max: $(window).height()
		},
		y: {
			min: $(window).height() * 0.2,
			max: $(window).height() * 0.8
		}
	});
}

proto.setupLoader = function(){
	var that = this;
	this.loader = new Loader();

	this.loader.onInit = function( config ){
		that.init( config );
	}

	this.loader.onLoaded = function( config ){
		that.init( config );
	};
}


proto.calculateResize = function(){
	var handleXProportion = this.handleX.pos.x / this.pWinW;
	var handleYProportion = this.handleY.pos.y / this.pWinH;
	var winW = $(window).width();
	var winH = $(window).height()
	this.handleX.setPos( { x: winW * handleXProportion } );
	this.handleY.setPos( { y: winH * handleYProportion } );

	this.handleX.constraints.y.max = $(window).height();
	this.handleY.constraints.x.max = $(window).width();

	this.sizeVideos();

	this.pWinW = winW;
	this.pWinH = winH;
}

proto.addListeners = function(){
	var that = this;
	$(window).on('resize', function(){
		that.calculateResize();
		clearTimeout( that.resizeTimeout );
		that.resizeTimeout = setTimeout(function(){
			that.calculateResize();
		}, 150);
	});
}

proto.sizePanes = function(){
	var leftW = Math.round( this.handleX.pos.x );
	var rightW = $(window).width() - leftW;
	this.paneLeft.setWidth( leftW );
	this.paneRight.setWidth( rightW );
}

proto.sizeAbout = function(){
	var leftW = Math.round( this.handleX.pos.x );
	var rightW = $(window).width() - leftW;
	this.about.setWidth( leftW, rightW );
}

proto.sizeVideos = function(){
	for( var i = 0; i < this.videos.length; i++ ){
		this.videos[i].setSize();
	}
}

proto.moveGrid = function(){
	var center = {
		x: this.handleX.pos.x,
		y: this.handleY.pos.y
	};
	this.project.setCenter( center );
	this.post.setCenter( center );
}

proto.init = function( config ){
	var that = this;
	this.setupPanes();
	this.setupHandles();
	if( this.firstTime ){
		that.handleY.setPos({
			y: $(window).height() * 0.7
		});
		this.firstTime = false;
	}
	// this.paneLeft = new Pane( $('.theme:first-child') );
	// this.paneRight = new Pane( $('.theme:nth-child(2)') );
	this.project = new Project( $('.layer__project') );
	this.post = new Post( $('.layer__post') );
	this.about = new About( $('.about-wrapper') );
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

	this.handleX.setConstraints({
		x: {
			min: this.paneLeft.minWidth,
			max: this.paneLeft.maxWidth
		},
		y: {
			min: 0,
			max: $(window).width()
		}
	});
	this.handleY.setConstraints({
		x: {
			min: 0,
			max: $(window).height()
		},
		y: {
			min: $(window).height() * 0.2,
			max: $(window).height() * 0.8
		}
	});

	this.handleX.onMove = function( pos ){
		that.sizePanes();
		that.sizeAbout();
		that.sizeVideos();
		that.handleY.setCrossPoint( that.handleX.pos.x );
		that.moveGrid();
	}
	this.handleY.onMove = function( pos ){
		that.sizeVideos();
		that.moveGrid();
	}

	this.sizePanes();
	this.sizeAbout();
	this.moveGrid();
	this.sizeVideos();

	if( $('body').hasClass('single-dc_project') ){
		this.project.setReorderable( false );
	}
	if( $('body').hasClass('single-post') ){
		this.post.setReorderable( false );
	}

	if( config && config.name === 'note' ){
		this.handleY.setCrossPoint( this.handleX.pos.x );
		if( this.handleX.pos.x > $(window).width()/2 ){
			this.handleY.setCroppedPart( 1 );
		}	else {
			this.handleY.setCroppedPart( 2 );
		}
	} else {
		this.handleY.setCroppedPart( 0 );
	}

	this.handleY.render();
};

proto.destroy = function(){
	
}

module.exports = Site;
