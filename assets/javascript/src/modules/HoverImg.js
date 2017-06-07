var $ = require('jquery');

var HoverImg = function( _ele ){
	this.$ele = $( _ele );
  this.ele = this.$ele.get(0);
	this.$trigger = this.$ele.parent().find('.dc-hoverimg-trigger');
	this.replaced = false;
	this.addListeners();
}

var proto = HoverImg.prototype;

proto.addListeners = function(){
	var that = this;
	this.$trigger.on( 'mouseenter', function(){
		console.log( 'activate hoverimg on', that.$ele );
		that.$ele.addClass('active');
		that.$ele.parent().addClass('hoverimg-active');
		that.setSrc();
	});
	this.$trigger.on( 'mouseleave', function(){
		that.$ele.parent().removeClass('hoverimg-active');
		that.$ele.removeClass('active');
	});
}

proto.setSrc = function(){
	if( this.replaced ){
		return;
	}
	this.$ele.attr( 'src', this.$ele.attr('data-src') );
	this.replaced = true;
}

module.exports = HoverImg;
