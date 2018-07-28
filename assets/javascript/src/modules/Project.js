var $ = require('jquery');
var Quadrant = require( './Quadrant.js' );
var Optiscroll = require('optiscroll');

var Project = function( _ele ){
	Quadrant.call( this, _ele );
	this.renderSections = $.extend({}, this.sections);
}

Project.prototype = Object.create( Quadrant.prototype );
Project.prototype.constructor = Project;

var proto = Project.prototype;

proto.getSections = function(){
	this.$images = this.$ele.find('.project-section__images');
	this.$description = this.$ele.find('.project-section__description');
	this.$header = this.$description.children('header:first-of-type');
	this.$wysiwyg = this.$description.children('.wysiwyg');
}

proto.render = function(){
	var primaryColumnName = 'w';
	var secondaryColumnName = 'e';
	if( this.order === 'rtl' ){
		primaryColumnName = 'e';
		secondaryColumnName = 'w';
	}
	var primary = $.grep( this.renderSections,function( section, index ){
		return section.name.indexOf( primaryColumnName ) !== -1;
	})[0];
	var secondary = $.grep( this.renderSections,function( section, index ){
		return section.name.indexOf( secondaryColumnName ) !== -1;
	})[0];
	this.$description
		.css( primary.css )
		.attr('data-section-location',  primary.name )
		.attr( 'data-section-span', primaryColumnName )
		.attr('data-proportion', this.calculateQuadrantProportion(  primary.css ) );

	this.$images
		.css( secondary.css )
		.attr('data-section-location', secondary.name )
		.attr( 'data-section-span', secondaryColumnName )
		.attr('data-proportion', this.calculateQuadrantProportion( secondary.css ) );

	this.$header
		.css({
			width: primary.css.width,
			top: 0,
			left: primary.css.left
		});

	this.$wysiwyg
		.css({
			'padding-top': this.$header.outerHeight() - 10
		});
	
	if( this.$description.length > 0 && !this.scrollbars ){
		this.scrollbars = new Optiscroll(this.$description.find('.scrollinner')[0], {forceScrollbars: true, maxTrackSize: 5});
		this.$description.find('.scrollinner').addClass('optiscroll');
	}
	if( this.order === 'rtl' ){
		this.$description.find('.scrollinner').addClass('is-rtl').removeClass('is-ltr');
	} else {
		this.$description.find('.scrollinner').addClass('is-ltr').removeClass('is-rtl');

	}
}

proto.calculateHierarchy = function(){
	this.largestColumn = 'w';
	this.smallestColumn = 'e';
	// sorts each section with [0] being the largest, [3] smallest
	this.sections.sort(function( a, b ){
		return (a.css.width*a.css.height) < (b.css.width*b.css.height);
	});
	if( this.sections[0].name === 'ne' || this.sections[0].name === 'se' ){
		this.largestColumn = 'e';
		this.smallestColumn = 'w';
	}
	this.renderSections = [
		this.sections[0] //largest column
	];
	for( var i = 1; i < this.sections.length; i++ ){
		if( this.sections[i].name.indexOf( this.smallestColumn ) !== -1 ){
			this.renderSections.push( this.sections[i] );
			break;
		}
	}
};

proto.destroy = function(){
	if( this.scrollbars ){
		this.scrollbars.destroy();
	}
	this.$images
		.attr('style','')
		.attr('data-section-location', '' );

	this.$description
		.attr('style','')
		.attr('data-section-location', '' );
}

module.exports = Project;
