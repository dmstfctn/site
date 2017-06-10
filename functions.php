<?php

require_once( 'inc/dc_acf.php' );

require_once( 'inc/dc_social.php' );

function dc_styles(){
	//wp_enqueue_style( 'font-source', '//cloud.webtype.com/css/d15347f5-e8a1-436a-9775-9427c520c1e1.css' );
	wp_enqueue_style( 'styles', get_template_directory_uri() . '/assets/styles/style.css', 'font-source', '80000000022' );
}

function dc_scripts() {
	$js_dist = get_template_directory_uri() . '/assets/javascript/dist/';

	// footer
	wp_enqueue_script( 'main', $js_dist . 'main.js', false, false, true );
}
add_action( 'wp_enqueue_scripts', 'dc_scripts' );
add_action( 'wp_enqueue_scripts', 'dc_styles' );

function dc_register_post_types(){
	register_post_type(
		'dc_project',
		array(
			'labels'	=> array(
				'name'			=> 'Projects',
				'singular_name'	=> 'Project'
			),
			'public' 		=> true,
			'has_archive' 	=> true,
			'rewrite' 		=> array( 'slug' => 'projects' ),
			'menu_position'	=> 5,
			'supports'		=> array( 'title', 'editor', 'revisions', 'excerpt', 'thumbnail' ),
			'taxonomies'	=> array( 'category', 'post_tag', 'topics' )
		)
	);
}

function dc_register_taxonomies(){
	register_taxonomy(
		'dc_tax_topics',
		array( 'post', 'dc_project', 'dc_social_twitter', 'dc_social_instagram' ),
		array(
			'hierarchical' 		=> true,
			'labels'			=> array(
				'name'				=> 'Topics',
				'singular_name'		=> 'Topic',
				'search_items'		=> 'Search Topics',
				'all_items'			=> 'All Topics',
				'parent_item'		=> 'Parent Topic',
				'parent_item_colon'	=> 'Parent Topic:',
				'edit_item'			=> 'Edit Topic',
				'update_item'		=> 'Update Topic',
				'add_new_item'		=> 'Add New Topic',
				'new_item_name'		=> 'New Topic Name',
				'menu_name'			=> 'Topic'
			),
			'show_ui'			=> true,
			'show_admin_column'	=> true,
			'query_var'			=> true,
			'rewrite'			=> array( 'slug' => 'topic' )
		)
	);
}

function dc_image_sizes(){
	add_image_size( 'dc_huge', 2560, 9999 );
	add_image_size( 'dc_normal', 1280, 9999 );
	add_image_size( 'dc_small', 640, 9999 );
}

function dc_init(){
	add_theme_support( 'post-thumbnails' );
	dc_register_post_types();
	dc_register_taxonomies();
	dc_image_sizes();
}

add_action( 'init', 'dc_init' );

require_once( 'inc/dc_template-tags.php');

?>
