var $ = require('jquery');

var Header = function( _ele ){
	this.$ele = (_ele) ? $( _ele ) : this.$ele;
  this.ele = this.$ele.get(0);
	this.width = this.$ele.outerWidth();
	this.resizable = false
	this.setConstraints();
	this.calculateProportion();
	this.addListeners();
	this.render();
}

var proto = Header.prototype;

proto.setWidth = function( to ){
	if( !this.resizable ){
		return;
	}
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
	this.maxWidth = this.$ele.parent().width();
}

proto.clearSizing = function(){
	this.width = this.maxWidth;
	this.calculateProportion();
	this.render();
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
	this.$ele.on('mouseenter', function(){
		that._onHover();
	});
}

proto.render = function(){
	this.$ele.attr('data-proportion', this.proportionName );
	this.$ele.css({
    'width': this.width
  });
}

proto.setResizable = function(){
	this.resizable = true;
}
proto.cancelResizable = function(){
	this.resizable = false;
}

proto._onHover = function(){
	if( typeof this.onHover === 'function' ){
		this.onHover();
	}
}

module.exports = Header
