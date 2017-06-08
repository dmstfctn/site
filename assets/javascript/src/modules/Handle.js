var $ = require('jquery');
var Unidragger = require( 'unidragger' );
var TWEEN = require('tween.js');

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

	this.isDragging = false;
	this.hasBeenPositioned = false;

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

proto.animate = function(){
	var that = this;
	var anim = function( time ){
		requestAnimationFrame( anim );
		TWEEN.update(time);
	};
	this.animFrame = requestAnimationFrame( anim );
};

proto.animatePos = function( to, _time ){
	if( this.isDragging || this.hasBeenPositioned ){
		return;
	}
	var time = _time || 200;
	console.log( time );
	var that = this;
	var pos = {};
	if( to.x ){
		pos.x = this.pos.x;
	}
	if( to.y ){
		pos.y = this.pos.y;
	}
	this.tween = new TWEEN.Tween( pos )
		.easing( TWEEN.Easing.Sinusoidal.In )
		.to( to, time )
		.onUpdate(function() {
			that.setPos( this );
		})
		//.delay( 100 )
		.start();

	cancelAnimationFrame( this.animFrame );
	this.animate();
};

proto.setCrossPoint = function( cross ){
	this.crossPoint = cross;
}

proto.setCroppedPart = function( crop ){
	// crop=0 means no croppping / hiding of any part of the handle
	//if moving y, so a horizontal handle then crop=1 is left and crop=2 is right
	//if moving x, so a vertical handle then crop=1 is top and crop=2 is bottom
	if( crop < 1 ){
		crop = 0;
	} else if (crop < 2 ) {
		crop = 1;
	} else {
		crop = 2;
	}
	this.crop = crop;
}

proto.setAllVisible = function(){
	if( this.movement.x )	{
		this.$ele.css({
			'left': 0,
			'right': 0
		});
	}
	if( this.movement.y )	{
		this.$ele.css({
			'top': 0,
			'bottom': 0
		});
	}
}

proto.render = function(){
	if( this.movement.x ){
		this.$ele.css({
	    'left': this.pos.x + 'px'
	  });
		if( this.crop === 0 ){
			this.$ele.css({
				top: 0,
				bottom: 0
			});
		} else if( this.crop === 1 ){
			this.$ele.css({
				top: this.crossPoint,
				bottom: 0
			});
		} else if( this.crop === 2 ){
			this.$ele.css({
				top: 0,
				bottom:  $(window).height() - this.crossPoint
			});
		}
	}
	if( this.movement.y ){
		this.$ele.css({
			'top': this.pos.y + 'px'
		});
		if( this.crop === 0 ){
			this.$ele.css({
				left: 0,
				right: 0
			});
		} else if( this.crop === 1 ){
			console.log( 'rendering handle from ', this.crossPoint, ' to ', 0 );
			this.$ele.css({
				left: this.crossPoint,
				right: 0
			});
		} else if( this.crop === 2 ){
			console.log( 'rendering handle from ', 0, ' to ', this.crossPoint );
			this.$ele.css({
				left: 0,
				right: $(window).width() - this.crossPoint
			});
		}
	}

};

proto.setIndicator = function(){
	var that = this;
	this.indicatorPosition = {
		left: 0,
		top: 0
	};
	$('body').on('mousemove', function( e ){
		var x = e.pageX;
		var y = e.pageY;
		if( that.movement.x && that.crop === 1){
			y = y - that.crossPoint;
		}
		if( that.movement.y && that.crop === 1 ){
			x = x - that.crossPoint;
		}
		that.moveIndicator({
			x: x,
			y: y
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
	this.isDragging = true;
	this.$ele.addClass('handle__active');
	this.pPos = {
		x: pointer.pageX,
		y: pointer.pageY
	};
};

proto.dragMove = function( event, pointer, moveVector ){
	this.hasBeenPositioned = true;
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
	this.isDragging = false;
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
