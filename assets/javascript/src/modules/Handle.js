var $ = require('jquery');
var Unidragger = require( 'unidragger' );

var Handle = function( _ele, _movement ){
  this.$ele = (_ele) ? $( _ele ) : this.$ele;
  this.ele = this.$ele.get(0);
  this.handles = [ this.ele ];
  this.$ele.css({
    'position': 'absolute'
  });

	_movement = _movement || {};

	this.movement = {
		x: _movement.x || false,
		y: _movement.y || false
	};

	this.pos = {
		x: this.$ele.offset().left ,
		y: this.$ele.offset().top
	};

	if( this.movement.x ){
		this.pos.x += this.$ele.width()/2;
	}
	if( this.movement.y ){
		this.pos.y += this.$ele.height()/2;
	}

	this.pPos = {
		x: this.pos.x,
		y: this.pos.y
	};

	this.$indicator = this.$ele.find('.indicator');
	this.setIndicator();
  this.render();

  this.bindHandles();
};

var proto = Handle.prototype = Object.create( Unidragger.prototype );

proto.setConstraints = function( constraints ){
	this.constraints = {
		x: {
			min: constraints.x.min || 0,
			max: constraints.x.max || Infinity
		},
		y: {
			min: constraints.y.min || 0,
			max: constraints.y.max || Infinity
		}
	};
};

proto.adjustPos = function( by ){
  var pos = {
		x: this.pos.x + by.x,
		y: this.pos.y + by.y
	};
  this.setPos( pos );
}

proto.setPos = function( to ){
	if( typeof to !== 'object' ){ throw new Error('to set handle position an object such as {x: 1, y:1} is required' ) };
	if( to.x > this.constraints.x.max ){
		to.x = this.constraints.x.max;
	}
	if( to.x < this.constraints.x.min ){
		to.x = this.constraints.x.min;
	}
	if( to.y > this.constraints.y.max ){
		to.y = this.constraints.y.max;
	}
	if( to.y < this.constraints.y.min ){
		to.y = this.constraints.y.min;
	}
	to.x = Math.floor( to.x );
	to.y = Math.floor( to.y );

  this.pos = to;
	this.render();
	this._onMove();
};


proto.render = function(){
	this.$ele.css({
    'left': this.pos.x + 'px',
		'top': this.pos.y + 'px'
  });
};

proto.setIndicator = function(){
	var that = this;
	this.indicatorPosition = {
		left: 0,
		top: 0
	};
	$('body').on('mousemove', function( e ){
		that.moveIndicator({
			x: e.pageX,
			y: e.pageY
		});
	});
};

proto.moveIndicator = function( at ){
	this.indicatorPosition = {
		left: (this.movement.y) ? at.x : this.indicatorPosition.x,
		top: (this.movement.x) ? at.y : this.indicatorPosition.y
	}
	this.$indicator.css( this.indicatorPosition );
}

proto.dragStart = function( event, pointer ){
	this.$ele.addClass('handle__active');
	this.pPos = {
		x: pointer.pageX,
		y: pointer.pageY
	};
};

proto.dragMove = function( event, pointer, moveVector ){
	var adjust = {
		x: (this.movement.x) ? pointer.pageX - this.pPos.x : 0,
		y: (this.movement.y) ? pointer.pageY - this.pPos.y : 0
	}
  this.adjustPos( adjust );

  this.pPos = {
		x: pointer.pageX,
		y: pointer.pageY
	};
};

proto.dragEnd = function( event, pointer ){
	this.$ele.removeClass('handle__active');
	this.pPos = {
		x: pointer.pageX,
		y: pointer.pageY
	};
};

proto._onMove = function(){
	if( typeof this.onMove === 'function' ){
		this.onMove( this.pos );
	}
}

module.exports = Handle;
