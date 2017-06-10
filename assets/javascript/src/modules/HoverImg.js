var $ = require('jquery');

var HoverImg = function( _ele ){
	this.$ele = $( _ele );
  this.ele = this.$ele.get(0);
	this.$trigger = this.$ele.parent().find('.dc-hoverimg-trigger');
	this.replaced = false;
	this.active = false;
	this.addListeners();
}

var proto = HoverImg.prototype;

proto.addListeners = function(){
	var that = this;
	this.$trigger.on( 'mouseenter', function(){
		that.activate();
	});
	this.$trigger.on( 'mouseleave', function(){
		that.deactivate();
	});
	this.$trigger.on( 'click', function(){
		that.toggle();
	});
}

proto.toggle = function(){
	if( this.active ){
		this.deactivate();
	} else {
		this.activate();
	}
}

proto.activate = function(){
	this.$ele.addClass('active');
	this.$ele.parent().addClass('hoverimg-active');
	this.setSrc();
	if( this.$ele.closest('.theme').attr('data-proportion') === 'tiny' ){
		var $theme = this.$ele.closest('.theme');
		var imgGap = 0;
		var imgW =  $theme.width() - (imgGap * 2);
		this.$ele.css({
			'position': 'fixed',
			'left': $theme.offset().left + (imgW/2) + imgGap,
			'width': imgW,
			'top': this.$ele.parent().offset().top
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

module.exports = HoverImg;
