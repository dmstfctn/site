var $ = require('jquery');

var Pane = function( _ele ){
	this.$ele = (_ele) ? $( _ele ) : this.$ele;
  this.ele = this.$ele.get(0);
	this.$scrollwrapper = this.$ele.find('.theme-scroller-wrapper');
	this.$content = this.$ele.find('.theme--content');
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
	var maxScroll = (this.$scrollwrapper[0].scrollHeight - this.$scrollwrapper.innerHeight());
	return this.$scrollwrapper.scrollTop() > maxScroll * 0.5;
}

proto.toggleLock = function(){
	var that = this;
	if( this.locked || this.isScrolled() ){
		this.$scrollwrapper.animate( { 'scrollTop': 0 }, 100, function(){
			that.unlockScroll();
		});
	} else {
		this.$scrollwrapper.animate( { 'scrollTop': (this.$scrollwrapper[0].scrollHeight - this.$scrollwrapper.innerHeight()) }, 100, function(){
			that.lockScroll();
		});
	}
}

proto.scrollMainBy = function( by ){
	var mainMaxScroll = this.$scrollwrapper[0].scrollHeight// - this.$ele.height();
	var innerMaxScroll = this.$inner[0].scrollHeight// - this.$inner.innerHeight();
	var ratio = (innerMaxScroll / mainMaxScroll) / 3 // 7.5;
	var mappedScroll = by * ratio;
	//mappedScroll = Math.min( mappedScroll, 10 );
	console.log( mappedScroll );
	var currentScroll = this.$scrollwrapper.scrollTop();
	this.$scrollwrapper.scrollTop( currentScroll + mappedScroll );
};

proto.scrollMainResponse = function(){
	var buffer = 0;
	var maxScroll = this.$scrollwrapper[0].scrollHeight - this.$scrollwrapper.height();
	var scroll = this.$scrollwrapper.scrollTop();
	var scrollAmount = ( scroll / maxScroll );
	var scrollLockAt = this.$content[0].offsetTop;
	var proportionToLock = scroll / scrollLockAt;

	if(  scroll >= scrollLockAt ){
		this.$scrollwrapper.scrollTop( scrollLockAt );
		this.lockScroll()
	} else {
		this.unlockScroll();
	}
	console.log( 'scroll amt', proportionToLock );
	this.$imageCover.css({
		//top: scroll,
		filter: 'blur(' + proportionToLock * 10 + 'px )',
		transform: 'scale(' + (1 + (proportionToLock*0.02)) + ' )'
		//opacity: 1 - proportionToLock
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

	// this.$scrollwrapper.on('mousewheel', function( e ){
	// 	if( that.locked ){
	// 		that.scrollInner( e.originalEvent.deltaY );
	// 	} else {
	// 		e.stopPropagation();
	// 		console.log( 'mousewheel' );
	// 		that.scrollMainBy( e.originalEvent.deltaY );
	// 		that.scrollMainResponse();
	// 		that.scrollInnerResponse();
	// 	}
	// });

	this.$ele.find('.theme--leader').on('click', function(){
		that.toggleLock();
	});
	this.$scrollwrapper.on('scroll', function(e){
		//e.preventDefault();
		//e.returnValue = false;
		that.scrollMainResponse();
		that.scrollInnerResponse();
		return false;
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
