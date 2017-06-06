var $ = require('jquery');

var Grid = function( _ele ){
	this.$ele = (_ele) ? $( _ele ) : this.$ele;

	this.center = {
		x: this.$ele.width() / 2,
		y: this.$ele.height() / 2
	};
	this.updateSize();
	this.nw = {
		name: 'nw',
		css: {
			width: this.center.x,
			height: this.center.y,
			left: 0,
			top: 0
		}
	};
	this.ne = {
		name: 'ne',
		css: {
			width: this.width - this.center.x,
			height: this.center.y,
			left: this.center.x,
			top: 0
		}
	};
	this.sw = {
		name: 'sw',
		css: {
			width: this.center.x,
			height: this.height - this.center.y,
			left: 0,
			top: this.center.y
		}
	};
	this.se = {
		name: 'se',
		css: {
			width: this.width - this.center.x,
			height: this.height - this.center.y,
			left: this.center.x,
			top: this.center.y
		}
	};
	this.updateGrid();
}

var proto = Grid.prototype;

proto.updateSize = function(){
	this.width = this.$ele.width();
	this.height = this.$ele.height();
}

proto.updateGrid = function(){
	this.nw.css.width = this.center.x;
	this.nw.css.height = this.center.y;
	this.nw.css.left = 0;
	this.nw.css.top = 0;

	this.ne.css.width = this.width - this.center.x;
	this.ne.css.height = this.center.y;
	this.ne.css.left = this.center.x;
	this.ne.css.top = 0;

	this.sw.css.width = this.center.x;
	this.sw.css.height = this.height - this.center.y;
	this.sw.css.left = 0;
	this.sw.css.top = this.center.y;

	this.se.css.width = this.width - this.center.x;
	this.se.css.height = this.height - this.center.y;
	this.se.css.left = this.center.x;
	this.se.css.top = this.center.y;
}

proto.setCenter = function( to ){
	this.center.x = to.x;
	this.center.y = to.y;
	this.updateSize();
	this.updateGrid();
}

module.exports = Grid;
