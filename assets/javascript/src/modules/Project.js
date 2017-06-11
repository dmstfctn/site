var $ = require('jquery');
var Quadrant = require( './Quadrant.js' );

var Project = function( _ele ){
	Quadrant.call( this, _ele );
}

Project.prototype = Object.create( Quadrant.prototype );
Project.prototype.constructor = Project;

var proto = Project.prototype;

proto.getSections = function(){
	this.$title = this.$ele.find('.project-section__title');
	this.$images = this.$ele.find('.project-section__images');
	this.$description = this.$ele.find('.project-section__description');
	this.$close = this.$ele.find('.project-section__close');
}

proto.render = function(){
	this.$images
		.css( this.sections[0].css )
		.attr('data-section-location', this.sections[0].name );

	this.$description
		.css( this.sections[1].css )
		.attr('data-section-location', this.sections[1].name )
		.attr('data-proportion', this.calculateQuadrantProportion( this.sections[1].css ) )

	this.$title
		.css( this.sections[2].css )
		.attr('data-section-location', this.sections[2].name );

	this.$close
		.css( this.sections[3].css )
		.attr('data-section-location', this.sections[3].name );
}

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
