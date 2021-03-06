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
	this.$topbar = this.$ele.find('.theme--leader');
	this.$title = this.$ele.find('.theme--leader h1');

	this.$possibleTitles = this.$ele.find('.theme-possible-title');
	this.$possibleTitleContainers = this.$ele.find('.theme-possible-title-container');
	this.$projects = this.$ele.find('.theme-item__work')

	this.firstClick = false;

	this.width = this.$ele.outerWidth();
	this.locked = false;
	this.scrollPercent = 0;

	this.setConstraints();
	this.calculateProportion();
	this.render();
	this.addListeners();
	this.setupScrollbar();
	this.setupTitle();

	this.imagesLoaded = false;
	this.deferredImageLoad();

}

var proto = Pane.prototype;

proto._onCoverLoaded = function(){
	if( typeof this.onCoverLoaded === 'function' ){
		this.onCoverLoaded();
	}
};
proto.onCoverLoaded = function(){ /* ... override ... */ };

proto.showCoverImage = function(){
	this.$imageCover.addClass('visible');
}

proto.deferredCoverImage = function( cb ){
	var that = this;
	var src = this.$imageCover.attr('data-src');
	var $img = $('<img>');
	$img.on('load', function(){
		that.$imageCover.css({
			'background-image': 'url(' + src + ')',
		});
		that._onCoverLoaded();
		if( typeof cb === 'function' ){
			cb();
		}
	});
	$img.attr('src', src);
};

proto.deferredImageLoad = function(){
	if( !this.imagesLoaded ){
		var that = this;
		this.deferredCoverImage(function(){
			that.$projects.find('img').each(function(){
				$(this).attr('src', $(this).attr('data-src') );
			});
			that.imagesLoaded = true;
		});
	}
}

proto.setupTitle = function(){
	var originalTitle = this.$title.html();
	this.$title.empty();
	this.$title.append( '<span class="editable"></span>' );
	this.$title.append( '<span class="original">' + originalTitle + '</span>' );
	this.$editableTitle = this.$title.find('.editable');
	this.currentTitle = '';
	this.setTitle();
}

proto.setTitle = function( _innerScroll ){
	var $closestTitle = this.$possibleTitles.filter(':last');
	var $closestContainer = this.$possibleTitleContainers.filter(':last');
	var closestDistance = Infinity;
	var scroll = _innerScroll;
	if( !scroll ){
		scroll = this.$inner.scrollTop();
	}
  if( scroll > 1 ){
		this.$ele.addClass( 'scrolled-past-top' );
	} else {
		this.$ele.removeClass( 'scrolled-past-top' );
	}
	this.$possibleTitleContainers.each(function(){
		var distance = $(this).offset().top;
		var titleContainerHeight = $(this).height();
		if( distance > -titleContainerHeight && distance < closestDistance ){
			closestDistance = distance;
			$closestContainer = $(this);
		}
	});
	this.$title.removeClass( 'hovered' );
	//this.$editableTitle.text( $closestContainer.find('.theme-possible-title').text() );
	var closestTitle = $closestContainer.find('.theme-possible-title').text();
	if( closestTitle !== this.currentTitle ){
		this.currentHeaderLink = $closestContainer.find('.theme-possible-title').closest('a');
		this.$editableTitle.text( closestTitle );
		if( this.currentHeaderLink.length > 0 ){
			this.$title.addClass('has-link');
		} else {
			this.$title.removeClass('has-link')
		}
		this.currentTitle = closestTitle;
	}

};

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
		var to = Math.ceil(this.$scrollwrapper.innerHeight() - this.$topbar.outerHeight());
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
		this.firstClick = true;
	}

	this.$imageCover.css({
		filter: 'blur(' + proportionToLock * 10 + 'px )'
	});

	this._onScrollMain();
};

proto.scrollInnerResponse = function( _innerScroll ){
	if( !this.locked ){
		return;
	}
	var scroll = _innerScroll;
	if( !scroll ){
		scroll = this.$inner.scrollTop();
	}
	var scrollMax = Math.round( this.$inner[0].scrollHeight - this.$inner.innerHeight() );
	this.scrollPercent = (scroll/scrollMax) * 100;

	this.innerPScroll = scroll;
}

proto.scrollInner = function( by, _innerScroll ){
	var scroll = _innerScroll;
	if( !scroll ){
		scroll = this.$inner.scrollTop();
	}
	var scrollMax = Math.round( this.$inner[0].scrollHeight - this.$inner.innerHeight() );
	this.scrollPercent = (scroll/scrollMax) * 100;
	if( scroll + by <= scrollMax - 1 ){
		this.$inner.scrollTop( scroll + by );
	}
}

proto.addListeners = function(){
	var that = this;
	var innerScrollTop = false;
	var scrollInnerCounter = 0;
	var scrollInnerTimer = (new Date()).getTime();
	var scrollWrapperTimer = (new Date()).getTime();
	var scrollTimeoutUpdate = false;
	this.firstClick = false;

	this.$ele.on('click.' + this.namespace, function(){
		if( that.locked || that.firstClick ){
			//return false;
		} else {
			that.firstClick = true;
			that.toggleLock();
		}
	});
	this.$ele.find('.theme--leader').on('click.' + this.namespace, function(){
		if( !that.firstClick ){
			that.toggleLock();
		} else {
			if( that.proportionName !== 'tiny' ){
				that.currentHeaderLink.click();
			}
		}
	});
	this.$scrollwrapper.on('scroll.' + this.namespace, function(e){
		if( !innerScrollTop ){
			innerScrollTop = that.$inner.scrollTop();
		}
		var t = (new Date()).getTime();
		if( t - scrollWrapperTimer > 33 ){ //max 20/sec
			that.scrollMainResponse();
			that.scrollInnerResponse( innerScrollTop );
			that.setTitle( innerScrollTop );
			scrollWrapperTimer = t;
		}
		return false;
	});
	this.$inner.on('scroll.' + this.namespace, function( e ){
		if( that.locked ){
			e.stopPropagation();
		}
		if( !innerScrollTop ){
			innerScrollTop = that.$inner.scrollTop();
		}
		var t = (new Date()).getTime();
		if( t - scrollInnerTimer > 33 ){ //max 10/sec
			innerScrollTop = that.$inner.scrollTop();
			that.setTitle( innerScrollTop );
			that.scrollInnerResponse( innerScrollTop );
			that.renderScrollBar();
			scrollInnerTimer = t;
		}
		clearTimeout( scrollTimeoutUpdate );
		scrollTimeoutUpdate = setTimeout(function(){
			that.setTitle( that.$inner.scrollTop() );
			that.scrollInnerResponse( that.$inner.scrollTop() );
			that.renderScrollBar();
		}, 5 );
	});
	this.$ele.on( 'mouseenter.' + this.namespace, function(){
		that._onHover();
	});
	this.$projects.on('mouseenter.' + this.namespace, function(){
		that.hoverTitles( $(this) );
	});
	this.$projects.on('mouseleave.' + this.namespace, function(){
		that.hoverTitles( false );
	})
};

proto.hoverTitles = function( $hovered ){
	if( !$hovered ){
		this.$title.removeClass( 'hovered' );
		return;
	}
	if( $hovered.find('h2').text() === this.$editableTitle.text() ){
		this.$title.addClass('hovered');
	} else {
		this.$title.removeClass( 'hovered' );
	}
}

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
	this.scrollbarOnEndDrag();
	this.$ele.off( 'click.' + this.namespace );
	this.$ele.find('.theme--leader').off( 'click.' + this.namespace );
	this.$scrollwrapper.off( 'scroll.' + this.namespace );
	this.$inner.off( 'scroll.' + this.namespace );
	this.$ele.off( 'mouseenter.' + this.namespace );
	this.$projects.off('mouseenter.' + this.namespace );
	this.$projects.off('mouseleave.' + this.namespace );
	this.$ele.attr('data-proportion', this.proportionName );
	this.$ele.attr('data-proportion', '' );
	this.$ele.attr( 'style', '' );

}

proto._onHover = function(){
	if( typeof this.onHover === 'function' ){
		this.onHover();
	}
}
proto._onScrollMain = function(){
	if( typeof this.onScrollMain === 'function' ){
		this.onScrollMain();
	}
}

module.exports = Pane;
