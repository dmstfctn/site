<?php
	// 1. customize ACF path
	add_filter('acf/settings/path', 'dc_acf_settings_path');
	 
	function dc_acf_settings_path( $path ) {
		$path = get_stylesheet_directory() . '/acf-pro/';
	    return $path;
	}
	 

	// 2. customize ACF dir
	add_filter('acf/settings/dir', 'dc_acf_settings_dir');
	 
	function dc_acf_settings_dir( $dir ) {
		$dir = get_stylesheet_directory_uri() . '/acf-pro/';
	    return $dir;
	}
	 
	// 3. Hide ACF field group menu item
	//add_filter('acf/settings/show_admin', '__return_false');


	// 4. Include ACF
	include_once( get_stylesheet_directory() . '/acf-pro/acf.php' );
		
?>