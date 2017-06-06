var $ = require('jquery');
var VimeoPlayer = require('@vimeo/player');

//var fitVids = require( '../lib/fitVids.js' )( $ );
var Video = function( _ele ){
	this.$ele = $(_ele);
	this.$video = this.$ele.find('iframe');
	this.player = new VimeoPlayer( this.$video[0] );
	this.vidW = this.$video.attr('width') || 16;
	this.vidH = this.$video.attr('height') || 9;
	this.vidRatio = this.vidH / this.vidW;

	this.playing = false;

	this.createDom();
	this.addListeners();
	this.setSize();
}

var proto = Video.prototype;

proto.createDom = function(){
	this.$cover = $('<div></div>').addClass('dc-video-cover');
	this.$ele.append( this.$cover );
}

proto.play = function(){
	this.player.play();
	this.playing = true;
}

proto.pause = function(){
	this.player.pause();
	this.playing = false;
}

proto.toggleVideo = function(){
	if( this.playing ){
		this.pause();
	} else {
		this.play();
	}
}

proto.addListeners = function(){
	var that = this;
	this.$cover.on('click', function(){
		that.toggleVideo();
	});
}

proto.setSize = function(){
	var eleW = this.$ele.width();
	var eleH = this.$ele.height();
	var w, h;
	if( eleW * this.vidRatio > eleH ){
		h = eleH;
		w = h / this.vidRatio;
	} else if( eleH / this.vidRatio > eleW ){
		w = eleW;
		h = w * this.vidRatio;
	}
	this.$video.width( w ).height( h );
	this.$cover.width( w ).height( h );
}

module.exports = Video;
