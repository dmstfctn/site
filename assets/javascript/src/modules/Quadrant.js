var $ = require('jquery');
var Grid = require( './Grid.js' );

var Quadrant = function( _ele ){
	this.$ele = (_ele) ? $( _ele ) : this.$ele;
	this.grid = new Grid( _ele );

	this.$ele.find('.quadrant-section').css('position', 'absolute');

	this.sections = [
		this.grid.ne,
		this.grid.se,
		this.grid.sw,
		this.grid.nw
	];

	this.order = 'ltr';

	if( this.$ele.find('.quadrant-wrapper').hasClass('quadrant-wrapper__offshore') ){
		this.order = 'rtl';
	}

	this.reorderable = true;
	this.getSections();
	this.calculateHierarchy();
	this.render();
}

var proto = Quadrant.prototype;

proto.getSections = function(){
	this.$one = this.$ele.find('.quadrant-section:nth-child(0)');
	this.$two = this.$ele.find('.quadrant-section:nth-child(1)');
	this.$three = this.$ele.find('.quadrant-section:nth-child(2)');
	this.$four = this.$ele.find('.quadrant-section:nth-child(3)');
}

proto.setCenter = function( to ){
	this.grid.setCenter( to );
	if( this.reorderable ){
		this.calculateHierarchy();
	}
	this.render();
}

proto.calculateHierarchy = function(){
	// sorts each section with [0] being the largest, [3] smallest
	this.sections.sort(function( a, b ){
		return (a.css.width*a.css.height) < (b.css.width*b.css.height);
	});
};

proto.calculateQuadrantProportion = function( css ){
	var max = $(window).width();
	var proportion = css.width / max;
	if( proportion <= 0.35 ){
		return 'small';
	} else {
		return 'normal';
	}
}

proto.render = function(){
	this.$one
		.css( this.sections[0].css )
		.attr('data-section-location', this.sections[0].name );

	this.$two
		.css( this.sections[1].css )
		.attr('data-section-location', this.sections[1].name );

	this.$three
		.css( this.sections[2].css )
		.attr('data-section-location', this.sections[2].name );

	this.$four
		.css( this.sections[3].css )
		.attr('data-section-location', this.sections[3].name );
}

proto.show = function(){
	this.$ele.show();
}

proto.hide = function(){
	this.$ele.hide();
}

proto.setReorderable = function( to ){
	this.reorderable = !!to;
	if( this.reorderable ){
		this.calculateHierarchy();
	}
}

module.exports = Quadrant;
