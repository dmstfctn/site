<?php
	function dc_get_post_images( $post ){
		$images = array();
		preg_match_all( '~<img [^\>]*\ />~', $post->post_content, $images );
		return $images[0];
	}

	function dc_add_class_to_linked_images( $html ){
		// with thanks to: https://stackoverflow.com/a/30540598
    $classes = 'image-link'; // can do multiple classes, separate with space

    $patterns = array();
    $replacements = array();

    $patterns[0] = '/<a(?![^>]*class)([^>]*)>\s*<img([^>]*)>\s*<\/a>/'; // matches img tag wrapped in anchor tag where anchor tag where anchor has no existing classes
    $replacements[0] = '<a\1 class="' . $classes . '"><img\2></a>';

    $patterns[1] = '/<a([^>]*)class="([^"]*)"([^>]*)>\s*<img([^>]*)>\s*<\/a>/'; // matches img tag wrapped in anchor tag where anchor has existing classes contained in double quotes
    $replacements[1] = '<a\1class="' . $classes . ' \2"\3><img\4></a>';

    $patterns[2] = '/<a([^>]*)class=\'([^\']*)\'([^>]*)>\s*<img([^>]*)>\s*<\/a>/'; // matches img tag wrapped in anchor tag where anchor has existing classes contained in single quotes
    $replacements[2] = '<a\1class="' . $classes . ' \2"\3><img\4></a>';

    $html = preg_replace($patterns, $replacements, $html);

    return $html;
	}

	add_filter('the_content', 'dc_add_class_to_linked_images', 100, 1);

	function dc_add_taxonomy_class_to_body( $classes ){
	    global $post;
			$tax = 'dc_tax_topics';
	    $terms = get_the_terms( $post->ID, $tax );
	    if ( $terms && ! is_wp_error( $terms ) ) {
	        foreach ($terms as $term) {
	            $classes[] = $tax . '-' . $term->slug;
	        }
	    }
	    return $classes;
	}

	add_filter( 'body_class', 'dc_add_taxonomy_class_to_body', 10, 1 );

	function dc_get_notes_url(){
		return get_permalink( get_option( 'page_for_posts' ) );
	}
	function dc_notes_url(){
		echo dc_get_notes_url();
	}

	function dc_get_project_media(){
		global $post;
		$media = array();
		if( have_rows('project_media') ){
			while ( have_rows('project_media') ){
				the_row();
        		if( get_row_layout() == 'project_media_image' ){
        			$img_id = get_sub_field( 'image' );
        			$img_src = wp_get_attachment_image_src( $img_id, 'dc_normal' );
        			$img_shadow = get_sub_field( 'shadow' );
        			$tag = '<img';
        			if( !$img_shadow ){
        				$tag .= ' class="no-shadow scale"';
        			}
        			$tag .= ' src="' . $img_src[0] . '">';
        			$media[] = $tag;
        		} else if( get_row_layout() == 'project_media_embed' ){
        			$embed = get_sub_field( 'embed' );
							$img_id = get_sub_field( 'image' );
							$img_src = wp_get_attachment_image_src( $img_id, 'dc_normal' );
							$tag = '<img src="' . $img_src[0] . '" width="' . $img_src[1] . '" height="' . $img_src[2] . '" class="dc-video-image">';
        			$media[] = '<div class="dc-video">'  . $embed . $tag . '</div>';
        		}
        	}
        	return $media;
        } else {
        	return false;
        }
	}

	function dc_project_media(){
		$media = dc_get_project_media();
		if( $media && is_array($media) ){
			foreach( $media as $m ){
				echo $m;
			}
		}
	}

	function dc_render_post_list( $posts ){
		if( count( $posts ) > 0 ){
			echo '<ul>';
			foreach( $posts as $p ){
				// https://codex.wordpress.org/Function_Reference/setup_postdata
				global $post;
				$post = $p;
				setup_postdata( $post );
				echo '<li>';
					echo '<a href="' . get_the_permalink() . '">' . get_the_title() . '</a>';
				echo '</li>';
			}
			echo '</ul>';
			wp_reset_postdata();
		}
	}

	function dc_render_notes_list( $posts ){
		if( count( $posts ) > 0 ){
			echo '<ul>';
			foreach( $posts as $p ){
				// https://codex.wordpress.org/Function_Reference/setup_postdata
				global $post;
				$post = $p;
				setup_postdata( $post );
				echo '<li class="' . get_post_type() . '">';
					if( get_post_type() !== 'post' ){
						$title = get_the_excerpt();
						$title = substr( $title, 0, 29 ) . "...";
						echo '<a href="' . get_the_permalink() . '">' . $title . '</a>';
					} else {
						echo '<a href="' . get_the_permalink() . '">' . get_the_title() . '</a>';
					}
				echo '</li>';
			}
			echo '</ul>';
			wp_reset_postdata();
		}
	}

	function dc_get_projects(){
		$projects = get_posts( array(
			'posts_per_page'   => -1,
			'post_type'        => 'dc_project',
			'post_status'      => 'publish'
		));
		return $projects;
	}

	function dc_list_projects(){
		$projects = dc_get_projects();
		dc_render_post_list( $projects );
	}

	function dc_get_notes( $count = -1 ){
		$notes = get_posts( array(
			'posts_per_page'   => $count,
			'post_type'        => array('post', 'dc_social_instagram', 'dc_social_twitter'),
			'post_status'      => 'publish'
		));
		return $notes;
	}


	function dc_list_recent_notes(){
		$notes = dc_get_notes( 3 );
		dc_render_notes_list( $notes );
	}

	function dc_get_topics(){
		$topics = get_terms( 'dc_tax_topics', array(
    	'hide_empty' => false,
			'orderby' => 'term_id',
			'order' => 'desc'
		));
		return $topics;
	}

	function dc_theme_columns(){
		$topics = dc_get_topics();
		foreach( $topics as $topic ){
			$theme = (object) array(
				'image'	=>	get_field( 'theme_image', $topic )['sizes']['dc_huge'],
				'description' => ( strlen($topic->description) > 0 ) ? $topic->description : false,
				'name'	=>	$topic->name,
				'slug'	=>	$topic->slug
			);
			include __DIR__ . '/../partials/theme-column.php';
		}
	}

	function dc_get_post_theme( $project_id ){
		$themes = wp_get_post_terms( $project_id, 'dc_tax_topics' );
		return $themes[0];
	}

	function dc_get_theme_projects( $theme_slug ){
		$project_query = new WP_Query( array(
			'posts_per_page'	=>	-1,
			'post_type'				=>	array('dc_project'),
			'post_status'			=>	'publish',
			'tax_query'				=>	array(
					array(
						'taxonomy'		=>	'dc_tax_topics',
						'field'				=>	'slug',
						'terms'				=>	$theme_slug
					)
			)
		));
		return $project_query;
	}

	function dc_get_post_related_list( $theme_slug, $count = 5 ){
		$research = get_posts( array(
			'posts_per_page'	=>	$count,
			'post_type'				=>	array( 'post', 'dc_project' ),
			'post_status'			=>	'publish',
			'orderby' => 'rand',
    	'order'    => 'ASC',
			'tax_query'				=>	array(
					array(
						'taxonomy'		=>	'dc_tax_topics',
						'field'				=>	'slug',
						'terms'				=>	$theme_slug
					)
			)
		));
	return $research;
	}

	function dc_get_theme_research( $theme_slug ){
		$research_query = new WP_Query( array(
			'posts_per_page'	=>	-1,
			'post_type'				=>	array('post'),
			'post_status'			=>	'publish',
			'tax_query'				=>	array(
					array(
						'taxonomy'		=>	'dc_tax_topics',
						'field'				=>	'slug',
						'terms'				=>	$theme_slug
					)
			)
		));
		return $research_query;
	}

	function dc_get_theme_notes( $theme_slug ){
		$notes_query = new WP_Query( array(
			'posts_per_page'	=>	-1,
			'post_type'				=>	array( 'dc_social_twitter', 'dc_social_instagram' ),
			'post_status'			=>	'publish',
			'tax_query'				=>	array(
					array(
						'taxonomy'		=>	'dc_tax_topics',
						'field'				=>	'slug',
						'terms'				=>	$theme_slug
					)
			)
		));
		return $notes_query;
	}

	function dc_get_news(){
		$all_themes = get_terms('dc_tax_topics');
		$slugs = array();
		foreach( $all_themes as $theme ){
			$slugs[] = $theme->slug;
		}
		$news_query = new WP_Query( array(
			'posts_per_page'	=>	-1,
			'post_type'				=>	array( 'dc_social_twitter', 'dc_social_instagram', 'post' ),
			'post_status'			=>	'publish',
			'tax_query'				=>	array(
					array(
						'taxonomy'		=>	'dc_tax_topics',
						'field'				=>	'slug',
						'terms'				=>	$slugs,
						'operator'		=>	'NOT IN'
					)
			)
		));
		return $news_query;
	}

	function dc_render_about_page(){
		$about_query = new WP_Query( array(
			'posts_per_page'	=>	1,
			'pagename'				=>  'about',
			'post_type'				=>	array( 'page' ),
			'post_status'			=>	'publish',
		));
		while( $about_query->have_posts() ){
			$about_query->the_post();
			include( __DIR__ . '/../partials/about-page-content.php' );
		}
	}

?>
