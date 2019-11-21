var $ = require('jquery');
var VimeoPlayer = require('@vimeo/player');
// youtube player api is included in functions.php...
// from: https://www.youtube.com/iframe_api
// docs: https://developers.google.com/youtube/iframe_api_reference#Examples

var ID = 0;

var Video = function( _ele ){
	this.$ele = $(_ele);
	this.$video = this.$ele.find('iframe');
	this.$img = this.$ele.find( '.dc-video-image' );
	this.playerType = 'unknown';
	if( this.$video.attr('src').indexOf('vimeo') > -1 ){
		this.playerType = 'vimeo';
		this.player = new VimeoPlayer( this.$video[0] );
	} else if( this.$video.attr('src').indexOf('youtube') > -1 ){
		this.playerType = 'youtube';
		this.player = new YT.Player( this.$video[0] );
	}
	console.log('video type: ', this.playerType )
	this.vidW = this.$video.attr('width') || 16;
	this.vidH = this.$video.attr('height') || 9;
	this.vidRatio = this.vidH / this.vidW;

	this.namespace = 'Video-' + ID;
	ID++;

	this.w = this.vidW;
	this.h = this.vidH;

	this.playing = false;

	this.createDom();
	this.addListeners();
	this.setSize();
	this.render();
}

var proto = Video.prototype;

proto.createDom = function(){
	this.$cover = $('<div></div>').addClass('dc-video-cover');
	this.$ele.append( this.$cover );
}

proto.play = function(){
	if( this.playerType === 'vimeo' ){
		this.player.play();
	}
	if( this.playerType === 'youtube' ){
		this.player.playVideo()
	}
}

proto.pause = function(){
	if( this.playerType === 'vimeo' ){
		this.player.pause();
	}
	if( this.playerType === 'youtube' ){
		this.player.pauseVideo()
	}
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
	this.$cover.on( 'click.' + this.namespace, function(){
		that.toggleVideo();
		that.render();
	});

	this.player.on('play.' + this.namespace, function(){
		that.playing = true;
		that.render();
	});
	this.player.on('pause.' + this.namespace, function(){
		that.playing = false;
		that.render();
	});
	this.player.on('ended.' + this.namespace, function(){
		that.playing = false;
		that.render();
	});
}

proto.setSize = function(){
	var eleW = this.$ele.width();
	var eleH = this.$ele.height();
	var w, h;
	if( eleW * this.vidRatio > eleH ){
		h = Math.ceil( eleH );
		w = Math.ceil( h / this.vidRatio );
	} else if( eleH / this.vidRatio > eleW ){
		w = Math.ceil( eleW );
		h = Math.ceil( w * this.vidRatio );
	} else {
		h = Math.ceil( eleH );
		w = Math.ceil( h / this.vidRatio );
	}

	this.w = w;
	this.h = h;
	this.render();
}

proto.render = function(){
	this.$ele.toggleClass( 'playing', this.playing );
	this.$video.width( this.w ).height( this.h );
	this.$cover.width( this.w ).height( this.h );
	this.$img.width( this.w ).height( this.h );
}

proto.destroy = function(){
	this.$video.width( '' ).height( '' );
	this.$cover.width( '' ).height( '' );
	this.$img.width( '' ).height( '' );
	this.$ele.removeClass('playing');
	this.$cover.off( 'click.' + this.namespace );
	this.player.off('play.' + this.namespace );
	this.player.off('pause.' + this.namespace );
	this.player.off('ended.' + this.namespace );
	this.$cover.remove();
}

module.exports = Video;
