var $ = require('jquery');
var Quadrant = require( './Quadrant.js' );

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
}

proto.render = function(){
	this.$images
		.css( this.renderSections[0].css )
		.attr('data-section-location', this.renderSections[0].name )
		.attr( 'data-section-span', this.largestColumn )
		.attr('data-proportion', this.calculateQuadrantProportion( this.renderSections[0].css ) );

	this.$description
		.css( this.renderSections[1].css )
		.attr('data-section-location', this.renderSections[1].name )
		.attr( 'data-section-span', this.smallestColumn )
		.attr('data-proportion', this.calculateQuadrantProportion( this.renderSections[1].css ) );

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
	this.$images
		.attr('style','')
		.attr('data-section-location', '' );

	this.$description
		.attr('style','')
		.attr('data-section-location', '' );

	this.$title
		.attr('style','')
		.attr('data-section-location', '' );

	this.$close
		.attr('style','')
		.attr('data-section-location', '' );
}

module.exports = Project;
