<?php
	//security
	defined( 'ABSPATH' ) or die( '' );

	function dc_social_attach_image( $image_url, $post_id, $is_featured ){
		//edited from: http://wordpress.stackexchange.com/a/41300
	    $upload_dir = wp_upload_dir();
	    $image_data = file_get_contents( $image_url );
	    $filename = basename( $image_url );
	    $url_data = parse_url( $image_url );
	    $filename = str_replace( "?" . $url_data['query'], "", $filename );
	    if( wp_mkdir_p( $upload_dir['path'] ) ){
	        $file = $upload_dir['path'] . '/' . $filename;
	    } else {
	    	$file = $upload_dir['basedir'] . '/' . $filename;
	    }
	    file_put_contents( $file, $image_data );

	    $wp_filetype = wp_check_filetype( $filename, null );

	    $attachment = array(
	        'post_mime_type' => $wp_filetype['type'],
	        'post_title' => sanitize_file_name( $filename ),
	        'post_content' => '',
	        'post_status' => 'inherit'
	    );

	    $attach_id = wp_insert_attachment( $attachment, $file, $post_id );

	    require_once(ABSPATH . 'wp-admin/includes/image.php');

	    $attach_data = wp_generate_attachment_metadata( $attach_id, $file );
	    $res1 = wp_update_attachment_metadata( $attach_id, $attach_data );

	    if( $is_featured ){
	    	$res2= set_post_thumbnail( $post_id, $attach_id );
	    }
	}

	function dc_social_register_post_types(){
		register_post_type(
			'dc_social_twitter',
			array(
				'labels'	=> array(
					'name'			=> 'Tweets',
					'singular_name'	=> 'Tweet'
				),
				'public' 		=> true,
				'has_archive' 	=> true,
				'rewrite' 		=> array( 'slug' => 'tweets' ),
				'menu_position'	=> 7,
				'supports'		=> array( 'title', 'editor', 'thumbnail' )
			)
		);
		register_post_type(
			'dc_social_instagram',
			array(
				'labels'	=> array(
					'name'			=> 'Instagrams',
					'singular_name'	=> 'Instagram'
				),
				'public' 		=> true,
				'has_archive' 	=> true,
				'rewrite' 		=> array( 'slug' => 'instagram' ),
				'menu_position'	=> 7,
				'supports'		=> array( 'title', 'editor', 'thumbnail' )
			)
		);
	}

	function dc_social_init(){
		add_option( 'dc_social_twittername', 'dmstfctn' );
		add_option( 'dc_social_twitter_api', array(
			'oauth_access_token' => "223886053-p1gKx97TByTvXcqxnnYO1r9TKAWirZoInV1B9UVe",
			'oauth_access_token_secret' => "GORDGpjimHCXvnGJtBRarToXOardwJTcyQnpM4JQ4WY52",
			'consumer_key' => "K38EXfeQVJ5h7QhwFCmQ9Hqsq",
			'consumer_secret' => "IY35X2mv8znCXRQGWQepyXbFr5mj27DyCQPSsrBF1d71tLRtql"
		));

		add_option( 'dc_social_instaname', 'dmstfctn' );

		dc_social_register_post_types();
	}

	add_action( 'init', 'dc_social_init' );

	if ( !wp_next_scheduled( 'dc_hook_get_social' ) ) {
	  wp_schedule_event( time(), 'hourly', 'dc_hook_get_social' );
	}

	add_action( 'dc_hook_get_social', 'dc_social_get' );

	function dc_social_instagram_get(){
		include 'lib/simple_html_dom.php';
		$instaname = get_option( 'dc_social_instaname' );
		$url = "https://instagram.com/" . $instaname;
		$html = file_get_html( $url );
		$data = $html->find('body', 0)->find('script', 2)->innertext;
		// get rid of the js bits
		$data = str_replace( "window._sharedData = ", "", $data );
		$data = str_replace( ";", "", $data );
		//parse as JSON
		$data = json_decode( $data );

		// try{
			foreach( $data->entry_data->ProfilePage[0]->user->media->nodes as $entry ){
				$datetime = new DateTime();
				$datetime->setTimestamp( strval($entry->date) );
				$datetime->setTimezone( new DateTimeZone('UTC') );
				$post = array(
					'id' => $entry->code,
					'text' => $entry->caption,
					'date' => $datetime->format('Y-m-d H:i:s'),
					'media' => array( $entry->display_src )
				);
				dc_social_make_post( 'dc_social_instagram', $post );
			}
		//} catch(Exception $e){
			// problems
		//}
	}

	function dc_social_twitter_get(){
		include 'lib/TwitterAPIExchange.php';
		include 'lib/TwitterTextFormatter.php';

		$twitterapi = get_option('dc_social_twitter_api');
		$twittername = get_option( 'dc_social_twittername' );

		$twitter = new TwitterAPIExchange( $twitterapi);
		$user_timeline = $twitter
			->setGetfield( "?screen_name={$twittername}" )
			->buildOauth( 'https://api.twitter.com/1.1/statuses/user_timeline.json', 'GET' )
			->performRequest();

		$user_timeline = json_decode( $user_timeline );

		foreach( $user_timeline as $userTweet ){
			$media = array();
			if( count($userTweet->entities->media) ){
				foreach( $userTweet->entities->media as $mediaItem ){
					$media[] = $mediaItem->media_url;
				}
			}
			if( !$userTweet->retweeted_status ){
				$datetime = new DateTime( $userTweet->created_at );
				$datetime->setTimezone( new DateTimeZone('UTC') );
				$post = array(
					'id' => $userTweet->id_str,
					'text' => TwitterTextFormatter::format_text( $userTweet ),
					'date' => $datetime->format('Y-m-d H:i:s'),
					'media' => $media
				);

				dc_social_make_post( 'dc_social_twitter', $post );

			}
		}
	}

	function dc_social_make_post( $type = false, $post ){
		if( !$type ) return false;
		// check if a tweet with this id has been pulled alreadt
		$posts = get_posts(array(
			'post_type' => $type,
			'post_status' => array(
				'any' // get any post status to check against - so we can set to draft and have it not re-imported
			),
			'meta_query' => array(
				array(
					'key' => 'social_id',
					'value' => $post['id'],
				)
			)
		));

		if( count( $posts ) < 1 ){
			$post_id = wp_insert_post( array(
				'post_date' => $post['date'],
				'post_title' => $post['id'],
				'post_content' => $post['text'],
				'post_status' => 'publish',
				'post_type' => $type,
				'meta_input' => array(
					'social_id' => $post['id']
				)
			));

			if( count( $post['media'] ) > 0 ){
				$featured = true;
				foreach( $post['media'] as $img_url ){
					dc_social_attach_image( $img_url, $post_id, $featured );
					$featured = false;
				}
			}
			return $post_id;
		}
		return false;
	}

	function dc_social_get(){
		dc_social_twitter_get();
		dc_social_instagram_get();

	}

	//for testing:
	//dc_social_get();
?>
