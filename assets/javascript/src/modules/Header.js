var $ = require('jquery');

var Header = function( _ele ){
	this.$ele = (_ele) ? $( _ele ) : this.$ele;
  this.ele = this.$ele.get(0);
	this.width = this.$ele.outerWidth();
	this.setConstraints();
	this.calculateProportion();
	this.render();
}

var proto = Header.prototype;

proto.setWidth = function( to ){
	this.width = to;
	if( this.width > this.maxWidth ){
		this.width = this.maxWidth;
	} else if( this.width < this.minWidth ){
		this.width = this.minWidth;
	}

	this.calculateProportion();
	this.render();
}

proto.setConstraints = function(){
	this.minWidth = this.$ele.parent().width() / 8;
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

proto.render = function(){
	this.$ele.attr('data-proportion', this.proportionName );
	this.$ele.css({
    'width': this.width
  });
}

module.exports = Header
