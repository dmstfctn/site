var $ = require('jquery');
var Quadrant = require( './Quadrant.js' );
var Optiscroll = require('optiscroll');

var Post = function( _ele ){
	Quadrant.call( this, _ele );
	this.renderSections = $.extend({}, this.sections);
}

Post.prototype = Object.create( Quadrant.prototype );
Post.prototype.constructor = Post;

var proto = Post.prototype;

proto.getSections = function(){
	this.$related = this.$ele.find('.post-section__related');
	this.$content = this.$ele.find('.post-section__contents');
	this.$header = this.$content.children('header:first-of-type');
	this.$wysiwyg = this.$content.children('.wysiwyg');
	//this.$close = this.$ele.find('.post-section__close');
}

proto.render = function(){
	var primary = this.renderSections[1];
	var primaryColumnName = this.smallestColumn;
	var secondary = this.renderSections[0];
	var secondaryColumnName = this.largestColumn;
	if( this.order === 'rtl' ){
		primary = this.renderSections[0];
		primaryColumnName = this.largestColumn;
		secondary = this.renderSections[1];
		secondaryColumnName = this.smallestColumn;
	}
	this.$content
		.css( primary.css )
		.attr('data-section-location',  primary.name )
		.attr( 'data-section-span', primaryColumnName )
		.attr('data-proportion', this.calculateQuadrantProportion(  primary.css ) );

	this.$related
		.css( secondary.css )
		.attr('data-section-location', secondary.name )
		.attr( 'data-section-span', secondaryColumnName )
		.attr('data-proportion', this.calculateQuadrantProportion( secondary.css ) );

	this.$header
		.css({
			width: primary.css.width,
			top: primary.css.top,
			left: primary.css.left
		});
	this.$wysiwyg
		.css({
			'padding-top': this.$header.outerHeight() - 10
		})

	if( this.$content.length > 0 && !this.scrollbars ){
		this.scrollbars = new Optiscroll(this.$content.find('.scrollinner')[0], {forceScrollbars: true, maxTrackSize: 5});
		this.$content.find('.scrollinner').addClass('optiscroll');
	}
	if( this.order === 'rtl' ){
		this.$content.find('.scrollinner').addClass('is-rtl').removeClass('is-ltr');
	} else {
		this.$content.find('.scrollinner').addClass('is-ltr').removeClass('is-rtl');
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
	this.$content.attr('style','')
		.attr( 'data-section-location', '' )
		.attr( 'data-section-span', '' );

	this.$related
		.attr('style','')
		.attr( 'data-section-location', '' );

}

module.exports = Post;
