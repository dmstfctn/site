var $ = require('jquery');

var Slideshow = function( _ele ){
	this.$ele = $( _ele );
	this.$slides = this.$ele.children();
	this.total = this.$slides.length
	this.current = 0;
	this.createDom();
	this.addListeners();
}

var proto = Slideshow.prototype;

proto.createDom = function(){
	this.$prev = $('<div></div>').addClass('dc-slideshow--prev');
	this.$next = $('<div></div>').addClass('dc-slideshow--next');
	this.$ele.append( this.$prev );
	this.$ele.append( this.$next );
}

proto.previousSlide = function(){
	this.current--;
	this.setSlide( this.current );
}

proto.nextSlide = function(){
	this.current++;
	this.setSlide( this.current );
}

proto.setSlide = function( to ){
	if( to > this.total - 1 ){
		to = 0;
	}

	if( to < 0 ){
		to = this.total - 1;
	}

	this.$slides.hide();
	this.$slides.eq( to ).show();
	this.current = to;
}

proto.addListeners = function(){
	var that = this;
	console.log( this.$prev );
	this.$prev.on('click', function(){
		that.previousSlide();
	});
	this.$next.on('click', function(){
		that.nextSlide();
	});
}

module.exports = Slideshow;
