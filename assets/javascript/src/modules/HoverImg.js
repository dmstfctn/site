var $ = require('jquery');

var HoverImg = function( _ele ){
	this.$ele = $( _ele );
  this.ele = this.$ele.get(0);
	this.$trigger = this.$ele.closest('.dc-hoverimg-trigger');
	this.replaced = false;
	this.addListeners();
}

var proto = HoverImg.prototype;

proto.addListeners = function(){
	var that = this;
	this.$trigger.on( 'mouseover', function(){
		console.log('triggered');
		that.setSrc();
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
