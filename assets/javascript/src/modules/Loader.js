var $ = require('jquery');

var Loader = function( context ){
	this.$context = (context) ? $(context) : $('html');
	this.loadTime = 300;
	this.setupPaths();
	this.addListeners();
	this.prepareLinks();
};

var proto = Loader.prototype;

proto.setupPaths = function(){
	this.pathBase = '/mmittee';
	if( window.location.href.indexOf( 'demystification.co/newsite') !== -1 ){
		//TODO: remove.
		//it's here only for the test/staging version...
		this.pathBase = '/newsite';
	}
	this.paths = {
		'about': {
			name: 'about',
			regexp: new RegExp( this.pathBase + '/about$'),
			selector: '.layer__committee'
		},
		'project': {
			name: 'project',
			regexp:	new RegExp( this.pathBase + '/projects/' ),
			selector: '.layer__project'
		},
		'home': {
			name: 'home',
			regexp: new RegExp( this.pathBase + '$' ),
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
}

proto.addListeners = function(){
	var that = this;
	$(window).on( 'popstate', function(e){
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

proto.load = function( state ){
	var that = this;
	var config = this.getLoadConfig( state.path );
	$('body').attr('class','loading');
	$.get( state.path, function( data ){
		var newBodyClasses = $( data.replace('<body', '<div id="was-body"') ).filter('#was-body').attr('class');

		document.title = $(data).filter("title").text();

		config.destination.html( $(data).find( config.selector ).html() );

		that.prepareLinks( config.destination );

		$('body').attr('class', newBodyClasses + ' loading' );

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
	if( pathname !== window.location.pathname ){
		window.history.pushState( stateObj, "", pathname );
		this.load( stateObj );
	} else if( search !== window.location.search ){
		window.history.pushState(stateObj, "", pathname );
		this.load( stateObj );
	}
}

proto.isExternalLink = function( url ){
	//see: http://stackoverflow.com/a/28054735
	var check = function(url) {
		if ( url.indexOf('//') === 0 ) { url = location.protocol + url; }
		return url.toLowerCase().replace(/([a-z])?:\/\//,'$1').split('/')[0];
	}
	var ext = ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && check(location.href) !== check(url) );
	if( url.indexOf('/wp-content/uploads/') !== -1 ){
		return true;
	} else {
		return ext;
	}
}

proto.prepareLinks = function( _$context ){
	var that = this;
	var $context = _$context || this.$context;
	$('a', $context ).on( 'click', function( e ){
		var isTargetBlank = ( $(this).attr('target') === '_blank' );
		e.preventDefault();
		if( !that.isExternalLink( this.href ) && !isTargetBlank ){
			that.historyChange( this.href, this.pathname, this.hash, this.search );
			e.preventDefault();
		}
	});
}

proto._onLoaded = function( config ){
	if( typeof this.onLoaded === 'function' ){
		this.onLoaded( config );
	}
}

module.exports = Loader;
