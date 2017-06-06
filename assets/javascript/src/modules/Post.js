var $ = require('jquery');
var Quadrant = require( './Quadrant.js' );

var Post = function( _ele ){
	Quadrant.call( this, _ele );
	this.renderSections = $.extend({}, this.sections);
}

Post.prototype = Object.create( Quadrant.prototype );
Post.prototype.constructor = Post;

var proto = Post.prototype;

proto.getSections = function(){
	this.$title = this.$ele.find('.post-section__title');
	this.$content = this.$ele.find('.post-section__contents');
	this.$close = this.$ele.find('.post-section__close');
}

proto.render = function(){
	this.$content
		.css( this.renderSections[0].css )
		.attr( 'data-section-location', this.renderSections[0].name )
		.attr( 'data-section-span', this.largestColumn );

	this.$title
		.css( this.renderSections[1].css )
		.attr( 'data-section-location', this.renderSections[1].name );

	this.$close
		.css( this.renderSections[2].css )
		.attr( 'data-section-location', this.renderSections[2].name );
}

proto.calculateHierarchy = function(){
	this.largestColumn = 'w';
	// sorts each section with [0] being the largest, [3] smallest
	this.sections.sort(function( a, b ){
		return (a.css.width*a.css.height) < (b.css.width*b.css.height);
	});
	if( this.sections[0].name === 'ne' || this.sections[0].name === 'se' ){
		this.largestColumn = 'e';
	}
	this.renderSections = [
		this.sections[0]
	];
	for( var i = 1; i < this.sections.length; i++ ){
		if( this.sections[i].name.indexOf( this.largestColumn ) === -1 ){
			this.renderSections.push( this.sections[i] );
		}
	}

};

module.exports = Post;
