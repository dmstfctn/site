var $ = require('jquery');

var ID = 0;

var Pane = function( _ele ){
	this.$ele = (_ele) ? $( _ele ) : this.$ele;

	this.namespace = 'Pane-' + ID;
	ID++;

  this.ele = this.$ele.get(0);
	this.$scrollwrapper = this.$ele.find('.theme-scroller-wrapper');
	this.$scrollBar = this.$ele.find('.dc-scrollbar');
	this.$scrollBarHandle = this.$ele.find('.dc-scrollbar--handle');
	this.$content = this.$ele.find('.theme--content');
	this.$inner = this.$ele.find('.theme--follower');
	this.$imageCover = this.$ele.find('.theme--image-cover');
	this.width = this.$ele.outerWidth();
	this.locked = false;
	this.scrollPercent = 0;
	this.setConstraints();
	this.calculateProportion();
	this.render();
	this.addListeners();
	this.setupScrollbar();
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
	if( this.proportion < 0.20 || this.width < 200 ){
		this.proportionName = 'tiny';
	} else if( this.proportion < 0.37 ){
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
		this.$scrollwrapper.animate( { 'scrollTop': 0 }, 250, function(){
			that.unlockScroll();
		});
	} else {
		var to = this.$scrollwrapper.innerHeight();
		this.$scrollwrapper.animate( { 'scrollTop': to }, to/3, function(){
			that.lockScroll();
		});
	}
}

proto.scrollMainBy = function( by ){
	var mainMaxScroll = this.$scrollwrapper[0].scrollHeight;
	var innerMaxScroll = this.$inner[0].scrollHeight;
	var ratio = (innerMaxScroll / mainMaxScroll) / 3;
	var mappedScroll = by * ratio;

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

	this.$imageCover.css({
		filter: 'blur(' + proportionToLock * 10 + 'px )',
		transform: 'scale(' + (1 + (proportionToLock*0.02)) + ' )'
	});
};

proto.scrollInnerResponse = function(){
	if( !this.locked ){
		return;
	}
	var scroll = this.$inner.scrollTop();
	var scrollMax = Math.round( this.$inner[0].scrollHeight - this.$inner.innerHeight() );
	this.scrollPercent = (scroll/scrollMax) * 100;

	if( scroll < 0 || (scroll < this.innerPScroll && scroll < 1 ) ){
		this.unlockScroll();
	}

	this.innerPScroll = scroll;
}

proto.scrollInner = function( by ){
	var scroll = this.$inner.scrollTop();
	var scrollMax = Math.round( this.$inner[0].scrollHeight - this.$inner.innerHeight() );
	this.scrollPercent = (scroll/scrollMax) * 100;
	if( scroll + by <= scrollMax - 1 ){
		this.$inner.scrollTop( scroll + by );
	}
}

proto.addListeners = function(){
	var that = this;
	var firstClick = false;
	this.$ele.on('click.' + this.namespace, function(){
		if( that.locked || firstClick ){
			return false;
		}
		firstClick = true;
		that.toggleLock();
	});
	this.$ele.find('.theme--leader').on('click.' + this.namespace, function(){
		that.toggleLock();
	});
	this.$scrollwrapper.on('scroll.' + this.namespace, function(e){
		that.scrollMainResponse();
		that.scrollInnerResponse();
		return false;
	});
	this.$inner.on('scroll.' + this.namespace, function( e ){
		if( that.locked ){
			e.stopPropagation();
		}
		that.scrollInnerResponse();
		that.renderScrollBar();
	});
	this.$ele.on( 'mouseenter.' + this.namespace, function(){
		that._onHover();
	});
};

proto.setupScrollbar = function(){
	var that = this;
	this.scrollbar = {};
	this.$scrollBarHandle.on( 'mousedown.' + this.namespace , function( e ){
		that.scrollbarStartDrag( e );
	});
}

proto.scrollbarDrag = function(e){
	e.preventDefault();
	// Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
	var dragPos = e.pageY - this.$scrollBar.height() - this.scrollbar.dragOffset - this.scrollbar.positionOffset;
	// Convert the mouse position into a percentage of the scrollbar height/width.
	var dragPerc = dragPos / this.$scrollBar.height();
	if( dragPerc < -0.9995 ){
		dragPerc = -0.9995;
	}
	if( dragPerc > 0 ){
		dragPerc = 0;
	}
	// Scroll the content by the same percentage.
	var scrollPos = this.$inner[0].scrollHeight - (dragPerc * this.$inner[0].scrollHeight * -1);
	this.$inner.scrollTop( scrollPos );
}

proto.scrollbarOnEndDrag = function(e){
	var that = this;
	$(document).off( 'mousemove.' + this.namespace );
	$(document).off('mouseup.' + this.namespace );
}

proto.scrollbarStartDrag = function(e){
	var that = this;
  e.preventDefault();

	this.scrollbar.dragOffset = e.pageY - this.$scrollBarHandle.offset().top;
	this.scrollbar.positionOffset = $(window).height() - this.$scrollBar.height();
  $(document).on('mousemove.' + this.namespace , function(e){
		that.scrollbarDrag(e);
	});
	$(document).on('mouseup.' + this.namespace , function(e){
		that.scrollbarOnEndDrag(e);
	});


}

proto.renderScrollBar = function(){
	this.$scrollBarHandle.css({
		top: this.scrollPercent + '%'
	})
}

proto.render = function(){
	this.$ele.attr('data-proportion', this.proportionName );
	this.$ele.css({
    'width': this.width
  });
}

proto.destroy = function(){
	console.log( 'DESTROY: ', this.namespace );
	this.scrollbarOnEndDrag();
	this.$ele.off( 'click.' + this.namespace );
	this.$ele.find('.theme--leader').off( 'click.' + this.namespace );
	this.$scrollwrapper.off( 'scroll.' + this.namespace );
	this.$inner.off( 'scroll.' + this.namespace );
	this.$ele.off( 'mouseenter.' + this.namespace );
	this.$ele.attr('data-proportion', this.proportionName );
	this.$ele.attr('data-proportion', '' );
	this.$ele.attr( 'style', '' );
}

proto._onHover = function(){
	if( typeof this.onHover === 'function' ){
		this.onHover();
	}
}

module.exports = Pane;
