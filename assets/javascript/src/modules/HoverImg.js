var $ = require('jquery');

var GLOBAL_TOUCHEXISTS = ("ontouchstart" in document.documentElement);
console.log( 'GLOBAL_TOUCHEXISTS? ', GLOBAL_TOUCHEXISTS  );
var ID = 0;

var HoverImg = function( _ele ){
	this.$ele = $( _ele );
  this.ele = this.$ele.get(0);
	this.$trigger = this.$ele.parent().find('.dc-hoverimg-trigger');
	this.replaced = false;
	this.active = false;

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
		this.$trigger.on( 'click.' + this.namespace, function(){
			console.log('trigger click')
			that.toggle();
		});
	}
	this.$trigger.on( 'touchend.' + this.namespace, function(){
		console.log('trigger click')
		that.toggle();
	});

}

proto.toggle = function(){
	if( this.active ){
		console.log('deactivate');
		this.deactivate();
	} else {
		console.log('activate');
		this.activate();
	}
}

proto.activate = function(){
	console.log( 'proto.activate()' );
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
	console.log( 'proto.setSrc()' );
	console.log( 'replaced? ', this.replaced )
	if( this.replaced ){
		return;
	}
	console.log( 'src: ', this.$ele.attr('data-src') );
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
