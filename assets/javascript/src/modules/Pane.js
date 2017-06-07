var $ = require('jquery');

var Pane = function( _ele ){
	this.$ele = (_ele) ? $( _ele ) : this.$ele;
  this.ele = this.$ele.get(0);
	this.$inner = this.$ele.find('.theme--follower');
	this.$imageCover = this.$ele.find('.theme--image-cover');
	this.width = this.$ele.outerWidth();
	this.locked = false;
	this.setConstraints();
	this.calculateProportion();
	this.render();
	this.addListeners();
}

var proto = Pane.prototype;

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

proto.lockScroll = function(){
	this.$ele.addClass( 'locked' );
	this.locked = true;
}

proto.unlockScroll = function(){
	this.$ele.removeClass( 'locked' );
	this.locked = false;
}

proto.isScrolled = function(){
	var maxScroll = (this.ele.scrollHeight - this.$ele.innerHeight());
	return this.$ele.scrollTop() > maxScroll * 0.5;
}

proto.toggleLock = function(){
	var that = this;
	if( this.locked || this.isScrolled() ){
		this.$ele.animate( { 'scrollTop': 0 }, 100, function(){
			that.unlockScroll();
		});
	} else {
		this.$ele.animate( { 'scrollTop': (this.ele.scrollHeight - this.$ele.innerHeight()) }, 100, function(){
			that.lockScroll();
		});
	}
}

proto.scrollMainBy = function( by ){
	var mainMaxScroll = this.ele.scrollHeight - this.$ele.height();
	var innerMaxScroll = this.$inner[0].scrollHeight - this.$inner.innerHeight();
	var ratio = (innerMaxScroll / mainMaxScroll) / 7.5;
	var mappedScroll = by * ratio;
	var currentScroll = this.$ele.scrollTop();
	this.$ele.scrollTop( currentScroll + mappedScroll );
};

proto.scrollMainResponse = function(){
	var buffer = 0;
	var maxScroll = this.ele.scrollHeight - this.$ele.height();
	var scroll = this.$ele.scrollTop();
	var scrollAmount = ( scroll / maxScroll );
	console.log( scroll, maxScroll - buffer );
	if( scroll >= maxScroll - buffer ){
		this.lockScroll();
	} else {
		this.unlockScroll();
	}
	this.$imageCover.css({
		top: scroll,
		filter: 'blur(' + scrollAmount * 10+ 'px )',
		opacity: 1- scrollAmount
	});
};

proto.scrollInnerResponse = function(){
	if( !this.locked ){
		return;
	}
	var scroll = this.$inner.scrollTop();
	if( scroll < 0 || (scroll < this.innerPScroll && scroll < 1 ) ){
		this.unlockScroll();
	}
	this.innerPScroll = scroll;
}

proto.scrollInner = function( by ){
	var scroll = this.$inner.scrollTop();
	var scrollMax = Math.round( this.$inner[0].scrollHeight - this.$inner.innerHeight() );
	if( scroll + by <= scrollMax - 1 ){
		this.$inner.scrollTop( scroll + by );
	}
}

proto.addListeners = function(){
	var that = this;

	this.$ele.on('mousewheel', function( e ){
		if( that.locked ){
			that.scrollInner( e.originalEvent.deltaY );
		} else {
			e.stopPropagation();
			console.log( 'mosuewheel' );
			that.scrollMainBy( e.originalEvent.deltaY );
			that.scrollMainResponse();
			that.scrollInnerResponse();
		}
	});

	this.$ele.find('.theme--leader').on('click', function(){
		that.toggleLock();
	});
	this.$ele.on('scroll', function(e){
		e.preventDefault();
		e.returnValue = false;
		return false;
		//that.scrollMainResponse();
	});
	this.$inner.on('scroll', function( e ){
		if( that.locked ){
			e.stopPropagation();
		}
		that.scrollInnerResponse();
	});
	this.$ele.on( 'mouseenter', function(){
		that._onHover();
	})
};

proto.render = function(){
	this.$ele.attr('data-proportion', this.proportionName );
	this.$ele.css({
    'width': this.width
  });
}

proto._onHover = function(){
	if( typeof this.onHover === 'function' ){
		this.onHover();
	}
}

module.exports = Pane;
