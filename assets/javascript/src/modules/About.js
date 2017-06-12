var $ = require('jquery');

var About = function( _ele ){
	this.$ele = (_ele) ? $( _ele ) : this.$ele;
  this.ele = this.$ele.get(0);
	this.$content = this.$ele.find('.about--content');
	this.$extra = this.$ele.find('.about--extra');
	this.widthR = Math.floor( this.$ele.outerWidth() / 2 );
	this.widthL = this.$ele.outerWidth() - this.widthR;
	this.setConstraints();
	this.calculateProportion();
	this.render();
}

var proto = About.prototype;

proto.setWidth = function( widthL, widthR ){
	this.widthR = widthR;
	if( this.widthR > this.maxWidth ){
		this.widthR = this.maxWidth;
	} else if( this.widthR < this.minWidth ){
		this.widthR = this.minWidth;
	}
	this.widthL = this.$ele.outerWidth() - widthR;
	this.calculateProportion();
	this.render();
}

proto.setConstraints = function(){
	this.minWidth = this.$ele.parent().width() / 8;
	this.maxWidth = this.$ele.parent().width() - this.minWidth;
}

proto.calculateProportion = function(){
	this.proportionL = this.widthL / this.maxWidth;
	this.proportionNameL = 'large';
	if( this.proportionL < 0.4 ){
		this.proportionNameL = 'small';
	} else if( this.proportionL < 0.7 ){
		this.proportionNameL = 'normal';
	}
	this.proportionR = this.widthR / this.maxWidth;
	this.proportionNameR = 'large';
	if( this.proportionR < 0.4 ){
		this.proportionNameR = 'small';
	} else if( this.proportionR < 0.7 ){
		this.proportionNameR = 'normal';
	}
}

proto.render = function(){
	// this.$content.attr('data-proportion', this.proportionNameL );
	// this.$extra.attr('data-proportion', this.proportionNameR );
	// this.$content.css({
  //   'width': this.widthL
  // });
	// this.$extra.css({
  //   'width': this.widthR
  // });
}

proto.destroy = function(){
	this.$content.attr( 'data-proportion', '' );
	this.$content.attr( 'style', '' );
	this.$extra.attr( 'data-proportion', '' );
	this.$extra.attr( 'style', '' );

}

module.exports = About;
