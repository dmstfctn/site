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
	this.addListeners();
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
	this.minWidth = this.$ele.parent().width() / 16;
	this.maxWidth = this.$ele.parent().width() - this.minWidth;
}

proto.calculateProportion = function(){
	this.proportion = this.width / this.maxWidth;
	this.proportionName = 'large';
	if( this.proportion < 0.15 ){
		this.proportionName = 'tiny';
	} else if( this.proportion < 0.3 ){
		this.proportionName = 'small';
	} else if( this.proportion < 0.7 ){
		this.proportionName = 'normal';
	}
}

proto.addListeners = function(){
	var that = this;
};

proto.render = function(){
	this.$content.attr('data-proportion', this.proportionName );
	this.$content.css({
    'width': this.widthR
  });
	this.$extra.css({
    'width': this.widthL
  });
}

module.exports = About;
