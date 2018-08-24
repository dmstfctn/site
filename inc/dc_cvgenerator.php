<?php
	function dc_cvgen_p2br( $text ){
		$text = preg_replace("/<p[^>]*?>/", "", $text );
		return str_replace("</p>", "<br />", $text );
	}
	function dc_cvgen_br2nl( $text ){
		//https://secure.php.net/manual/en/function.nl2br.php#86678
    return preg_replace('/\<br(\s*)?\/?\>/i', "\n", $text );
	}
	function dc_cvgen_links2text( $text ){
		//tested / figured out here: https://regexr.com/
		return preg_replace('/\<a\s*href="(.*)"\s*\>(.*)\<\/\s*a\s*\>\<br\s*?\/?\>\s*(.*)/i', "$2\n$3$1\n", $text );
	}

	function dc_cvgen_format( $text ){
		$text = dc_cvgen_p2br( $text );
		$text = dc_cvgen_br2nl( $text );
		return strip_tags( $text );
	}

	function dc_cvgen_onsavepost( $post_id ) {
		$template = basename( get_page_template() );
		if( $template !== 'page-about.php'){
			return;
		}
		$post = get_post( $post_id );
		//$contact = get_field('contact');
		$bio = $post->post_content;
		$extended_bio = get_field('extended_bio');
		$sections = get_field('about_sections');

		// $contact = dc_cvgen_format( $contact );
		$bio = dc_cvgen_format( $bio );
		$extended_bio = dc_cvgen_format( $extended_bio );

		$cv = 'Demystification Committee';
		$cv .= "\n";
		$cv .= "chair@demystification.co";

		$cv .= "\n\n\n";
		$cv .= $bio;
		$cv .= "\n\n";
		$cv .= $extended_bio;
		$cv .= "\n";
		foreach( $sections as $section ){
			$title = $section['about_sections_title'];
			$title = dc_cvgen_format( $title );
			$content = $section['about_sections_content'];
			$content = dc_cvgen_links2text( $content );
			$content = dc_cvgen_format( $content );

			$cv .= $title;
			$cv .= "\n";
			$cv .= $content;
			$cv .= "\n";
		}
		$cv .= "\n\n";
		$cv .= 'Generated at ' . date('H.i.s \o\n d.m.Y');
		file_put_contents(  '/mmittee/downloads/DC_CV.txt', $cv );
		//for local debug, but also just because
		file_put_contents( __DIR__ . '/DC_CV.txt', $cv );
	}

add_action('acf/save_post', 'dc_cvgen_onsavepost', 20);

?>
