var $ = require('jquery');

var ID = 0;

if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}


var Loader = function( context ){
	var that = this;

	this.referrer = document.referrer;

	this.namespace = 'Loader-' + ID;
	ID++;

	this.$context = (context) ? $(context) : $('html');
	this.loadTime = 100;
	this.setupPaths();
	this.addListeners();
	this.prepareLinks();

	setTimeout(function(){
		that._onInit( that.getLoadConfig( window.location.pathname ) );
	},1);
};

var proto = Loader.prototype;

proto.setupPaths = function(){
	this.pathBase = '/mmittee';
	this.paths = {
		'about': {
			name: 'about',
			regexp: new RegExp( this.pathBase + '/about/?$'),
			selector: '.layer__committee'
		},
		'project': {
			name: 'project',
			regexp:	new RegExp( this.pathBase + '/projects/' ),
			selector: '.layer__project'
		},
		'home': {
			name: 'home',
			regexp: new RegExp( this.pathBase + '/?$' ),
			selector: '.layer__themes'
		},
		'note': {
			name: 'note',
			regexp: new RegExp( this.pathBase + '/*' ),
			selector: '.layer__post'
		}
	};
	for( var i in this.paths ){
		this.paths[i].destination = this.$context.find( this.paths[i].selector );
	}
	//console.log( this.paths );
}

proto.addListeners = function(){
	var that = this;
	$(window).on( 'popstate.' + this.namespace, function(e){
		var state = history.state;
		if( state ){
			that.load( state );
		}
	});
	window.history.pushState( {
		hash: false,
		path: window.location.pathname
	}, "", window.location.pathname );
}

proto.getLoadConfig = function( path ){
	for( var type in this.paths ){
		if( this.paths[type].regexp.test( path ) ){
			return this.paths[type];
		}
	}
}

proto.isLoadingAbout = function( classes, html ){
	return (classes.indexOf( 'page-template-page-about' ) !== -1);
}

proto.isLoadingBlack = function( classes, html ){
	return $( $(html)[0] ).hasClass( '.quadrant-wrapper__network-ensemble' );
}

proto.load = function( state ){
	if( this.goingBack ){
		this.goingBack = false;
		if( state.path === this.pPath ){
			this.historyChange( window.location.origin + this.pathBase, this.pathBase );
			return;
		}
	}
	var that = this;
	var config = this.getLoadConfig( state.path );
	//$('body').attr('class','loading');
	$('body').addClass('loading');

	$.get( state.path, function( data ){
		var newBodyClasses = $( data.replace('<body', '<div id="was-body"') ).filter('#was-body').attr('class').replace('no-js','')
		var $html = $(data).find( config.selector ).html();
		var title = $(data).filter("title").text();

		var logoLink = $(data).filter('.committee-header').find('a').attr('href');


		document.title = title;
		config.destination.html( $html );

		$('.committee-header a').attr('href',logoLink);

		that.prepareLinks( config.destination );

		$('body').attr('class', newBodyClasses + ' loading' );
		if( that.isLoadingBlack( newBodyClasses, $html ) === false ){
			$('body').addClass('dc-black-page');
			$('.dc-site-loader').attr( 'data-loading', 'white' );
		} else {
			$('.dc-site-loader').attr( 'data-loading', 'black' );
		}
		if( that.isLoadingAbout( newBodyClasses, $html ) ){
			$('.dc-site-loader').attr( 'data-loading', 'red' );
		}

		setTimeout( function(){
			$('body').removeClass('loading');
		}, that.loadTime );

		that._onLoaded( config );

	});
}

proto.historyChange = function( href, pathname, hash, search ){
	var stateObj = {
		hash: false,
		path: false
	};
	if( pathname !== '/' ){
		pathname = href.slice( href.indexOf(pathname) );
	}
	if( hash ){
		pathname = pathname.replace( hash, '' );
		stateObj.hash = hash;
	}
	stateObj.path = pathname;
	this.referrer = pathname;
	if( pathname !== window.location.pathname ){
		window.history.pushState( stateObj, "", pathname );
		this.load( stateObj );
	} else if( search !== window.location.search ){
		window.history.pushState(stateObj, "", pathname );
		this.load( stateObj );
	}

}

proto.historyBack = function(){
	if( this.referrer === '' || this.referrer.indexOf( '/mmittee' ) !== 0 ){
		var that = this;
		//console.log('nowhere to go back to')
		var path = this.pathBase + '/';
		window.history.pushState({path: path }, "", path );
		setTimeout(function(){
			that.load( {path: path })
		}, 50 );

	} else {
		this.goingBack = true;
		this.pPath = window.location.pathname;
		window.history.back();
	}
}

proto.isExternalLink = function( url ){
	//see: http://stackoverflow.com/a/28054735
	var check = function(url) {
		if ( url.indexOf('//') === 0 ) { url = location.protocol + url; }
		return url.toLowerCase().replace(/([a-z])?:\/\//,'$1').split('/')[0];
	}
	var ext = ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && check(location.href) !== check(url) );
	if( url.indexOf('/wp-content/uploads/') !== -1 ||  url.indexOf('/downloads/') !== -1 || url.indexOf('/toe/') !== -1 ){
		return true;
	} else {
		return ext;
	}
}

proto.prepareLinks = function( _$context ){
	var that = this;
	var $context = _$context || this.$context;
	$('a', $context ).on( 'click.' + this.namespace, function( e ){
		var isTargetBlank = ( $(this).attr('target') === '_blank' );
		if( !that.isExternalLink( this.href ) && !isTargetBlank ){
			e.preventDefault();
			that.historyChange( this.href, this.pathname, this.hash, this.search );
		}
	});
}

proto._onLoaded = function( config ){
	if( typeof this.onLoaded === 'function' ){
		this.onLoaded( config );
	}
}
proto._onInit = function( config ){
	if( typeof this.onInit === 'function' ){
		this.onInit( config );
	}
}

proto.destroy = function(){
	$(window).off( 'popstate.' + this.namespace );
	$('a').off( 'click.' + this.namespace );

}

module.exports = Loader;
