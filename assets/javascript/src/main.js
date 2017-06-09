var $ = require( 'jquery' );
var Site = require( './modules/Site' );
var site = false;

if( $(window).width() > 640 ){
	$('body').removeClass('no-js');
	site = new Site();
}


 $(window).on('resize', function(){
	 if( site ){
		 return false;
	 }
	 if( $(window).width() > 640 ){
	 	$('body').removeClass('no-js');
	 	site = new Site();
	 }
 })
