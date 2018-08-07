var $ = require('jquery');

var GLOBAL_TOUCHEXISTS = ("ontouchstart" in document.documentElement);

var ID = 0;

var HoverImg = function( _ele ){
	this.$ele = $( _ele );
  this.ele = this.$ele.get(0);
	this.$trigger = this.$ele.parent().find('.dc-hoverimg-trigger').add(this.$ele.closest('.theme-item'));
	this.replaced = false;
	this.active = false;

	this.$ele.parent().find('a').click(function(e){
		e.stopPropagation();
	});

	this.namespace = 'HoverImg-' + ID;
	ID++;

	this.addListeners();
}

var proto = HoverImg.prototype;

proto.addListeners = function(){
	var that = this;
	if( !GLOBAL_TOUCHEXISTS ){
		this.$trigger.on( 'mouseenter.' + this.namespace, function(){
			that.activate();
		});
		this.$trigger.on( 'mouseleave.' + this.namespace, function(){
			that.deactivate();
		});
		this.$trigger.on( 'click.' + this.namespace, function( e ){
			if( that.active ){
					that.followLink();
			} else {
				that.toggle();
			}
		});
	}
	this.$trigger.on( 'touchend.' + this.namespace, function(){
		if( that.active ){
			that.followLink();
		} else {
			that.toggle();
		}
	});

}

proto.toggle = function(){
	if( this.active ){
		this.deactivate();
	} else {
		this.activate();
	}
}

proto.followLink = function(){
	if( this.$ele.parent().find('a').length > 0 ){
		window.open( this.$ele.parent().find('a').first().attr('href'), '_blank');
	}
}

proto.activate = function(){
	this.$ele.addClass('active');
	this.$ele.parent().addClass('hoverimg-active');
	this.setSrc();
	if( this.$ele.closest('.theme').attr('data-proportion') === 'tiny' ){
		var $item = this.$ele.closest('.theme-item');
		var $section = this.$ele.closest('.theme--section');
		var itemLeft = $item.position().left;
		var $theme = this.$ele.closest('.theme');
		var imgGap = 0;
		var imgW =  $theme.width() - (imgGap * 2);
		this.$ele.css({
			'position': 'absolute',
			'left': -itemLeft - 3,
			'width': imgW,
			'top': 0,
			'transform': 'translateY(-50%)'
		})
	} else {
		this.$ele.attr('style','');
	}
	this.active = true;
}

proto.deactivate = function(){
	this.$ele.parent().removeClass('hoverimg-active');
	this.$ele.removeClass('active');
	this.active = false;
}

proto.setSrc = function(){
	if( this.replaced ){
		return;
	}
	this.$ele.attr( 'src', this.$ele.attr('data-src') );
	this.replaced = true;
}

this.destroy = function(){
	this.deactivate();
	this.$trigger.off( 'mouseenter.' + this.namespace );
	this.$trigger.off( 'mouseleave.' + this.namespace );
	this.$trigger.off( 'click.' + this.namespace );
	this.$trigger.off( 'touchend.' + this.namespace );
}

module.exports = HoverImg;
