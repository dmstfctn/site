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

var init = function( config ){
	var header = new Header( $('.committee-header') );
	var paneLeft = new Pane( $('.theme:first-child') );
	var paneRight = new Pane( $('.theme:nth-child(2)') );

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

	var project = new Project( $('.layer__project') );
	var post = new Post( $('.layer__post') );
	var about = new About( $('.about-wrapper') );

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

	var moveGrid = function(){
		var center = {
			x: handleX.pos.x,
			y: handleY.pos.y
		};
		project.setCenter( center );
		post.setCenter( center );
	}

	handleX.onMove = function( pos ){
		sizePanes();
		sizeAbout();
		sizeHeader();
		handleY.setCrossPoint( handleX.pos.x );
		moveGrid();
	}
	handleY.onMove = function( pos ){
		moveGrid();
	}

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

		pWinW = winW;
		pWinH = winH;
	});

	$('.dc-slideshow').each(function(){
		new Slideshow( $(this) );
	});

	$('.dc-hoverimg-img').each(function(){
		new HoverImg( $(this) );
	});
	$('.dc-video').each(function(){
		new Video( $(this) );
	});

	sizePanes();
	sizeAbout();
	moveGrid();
	sizeHeader();

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
		handleY.render();
	} else {
		console.log( 'we not on a note' );
		handleY.setCroppedPart( 0 );
	}

}

var loader = new Loader();

var handleX = new Handle( '#handle-x', { x: true } );
var handleY = new Handle( '#handle-y', { y: true } );

loader.onInit = function( config ){
	init( config );
}

loader.onLoaded = function( config ){
	console.log('loader loaded -> init()')
	init( config );
};
