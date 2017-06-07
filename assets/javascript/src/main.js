var $ = require( 'jquery' );
var Handle = require( './modules/Handle.js' );
var Pane = require( './modules/Pane.js' );
var Project = require( './modules/Project.js' );
var Post = require( './modules/Post.js' );
var About = require( './modules/About.js' );
var HoverImg = require('./modules/HoverImg.js' );
var Loader = require('./modules/Loader.js' );
var Slideshow = require('./modules/Slideshow.js' );
var Video = require('./modules/Video.js' );
var Header = require('./modules/Header.js');


var project;
var post;
var about;
var slideshows = [];
var hoverImgs = [];
var videos = [];


var sizePanes = function(){
	var leftW = Math.round(handleX.pos.x);
	var rightW = $(window).width() - leftW;
	paneLeft.setWidth( leftW );
	paneRight.setWidth( rightW );
}

var sizeAbout = function(){
	var leftW = Math.round(handleX.pos.x);
	var rightW = $(window).width() - leftW;
	about.setWidth( leftW, rightW );
}

var sizeHeader = function(){
	var leftW = Math.round(handleX.pos.x);
	header.setWidth( leftW );
}

var sizeVideos = function(){
	for( var i = 0; i < videos.length; i++ ){
		videos[i].setSize();
	}
}

var moveGrid = function(){
	var center = {
		x: handleX.pos.x,
		y: handleY.pos.y
	};
	project.setCenter( center );
	post.setCenter( center );
}

var init = function( config ){
	console.log ('INIT. CONFIG: ', config );
	paneLeft = new Pane( $('.theme:first-child') );
	paneRight = new Pane( $('.theme:nth-child(2)') );
	project = new Project( $('.layer__project') );
	post = new Post( $('.layer__post') );
	about = new About( $('.about-wrapper') );
	slideshows = [];
	hoverImgs = [];
	videos = [];

	$('.dc-slideshow').each(function(){
		slideshows.push( new Slideshow( $(this) ) );
	});

	$('.dc-hoverimg-img').each(function(){
		hoverImgs.push( new HoverImg( $(this) ) );
	});

	$('.dc-video').each(function(){
		videos.push( new Video( $(this) ) );
	});

	handleX.setConstraints({
		x: {
			min: paneLeft.minWidth,
			max: paneLeft.maxWidth
		},
		y: {
			min: 0,
			max: $(window).width()
		}
	});
	handleY.setConstraints({
		x: {
			min: 0,
			max: $(window).height()
		},
		y: {
			min: $(window).height() * 0.2,
			max: $(window).height() * 0.8
		}
	});

	handleX.onMove = function( pos ){
		sizePanes();
		sizeAbout();
		sizeHeader();
		sizeVideos();
		handleY.setCrossPoint( handleX.pos.x );
		moveGrid();
	}
	handleY.onMove = function( pos ){
		sizeVideos();
		moveGrid();
	}

	sizePanes();
	sizeAbout();
	moveGrid();
	sizeHeader();
	sizeVideos();

	if( $('body').hasClass('single-dc_project') ){
		project.setReorderable( false );
	}
	if( $('body').hasClass('single-post') ){
		post.setReorderable( false );
	}

	if( config && config.name === 'note' ){
		handleY.setCrossPoint( handleX.pos.x );
		if( handleX.pos.x > $(window).width()/2 ){
			handleY.setCroppedPart( 1 );
		}	else {
			handleY.setCroppedPart( 2 );
		}
	} else {
		handleY.setCroppedPart( 0 );
	}
	if( config && config.name === 'home' ){
		paneLeft.onHover = function(){
			handleX.animatePos({ x: $(window).width() * 0.66 });
		};
		paneRight.onHover = function(){
			handleX.animatePos({ x: $(window).width() * 0.33 });
		};
		header.onHover = function(){
			handleX.animatePos({ x: $(window).width() * 0.5 });
		}
	}
	if( config && config.name === 'about' ){
		header.setResizable();
		sizeHeader();
	} else {
		header.cancelResizable();
		header.clearSizing();
		header.render();
	}
	handleY.render();
};

var paneLeft = new Pane( $('.theme:first-child') );
var paneRight = new Pane( $('.theme:nth-child(2)') );
var handleX = new Handle( '#handle-x', { x: true } );
var handleY = new Handle( '#handle-y', { y: true } );

handleX.setConstraints({
	x: {
		min: paneLeft.minWidth,
		max: paneLeft.maxWidth
	},
	y: {
		min: 0,
		max: $(window).width()
	}
});
handleY.setConstraints({
	x: {
		min: 0,
		max: $(window).height()
	},
	y: {
		min: $(window).height() * 0.2,
		max: $(window).height() * 0.8
	}
});

var header = new Header( $('.committee-header') );

var loader = new Loader();

var pWinW = $(window).width();
var pWinH = $(window).height();

$(window).on('resize', function(){
	var handleXProportion = handleX.pos.x / pWinW;
	var handleYProportion = handleY.pos.y / pWinH;
	var winW = $(window).width();
	var winH = $(window).height()
	handleX.setPos( { x: winW * handleXProportion } );
	handleY.setPos( { y: winH * handleYProportion } );

	handleX.constraints.y.max = $(window).height();
	handleY.constraints.x.max = $(window).width();

	sizeVideos();

	pWinW = winW;
	pWinH = winH;
});

loader.onInit = function( config ){
	handleY.setPos({
		y: $(window).height() * 0.7
	});
	init( config );
}

loader.onLoaded = function( config ){
	console.log('loader loaded -> init()')
	init( config );
};
