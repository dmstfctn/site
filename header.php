<!DOCTYPE html>
<html <?php language_attributes(); ?> <?php if( dc_browser() ): ?>class="b-<?php echo dc_browser(); ?>"<?php endif; ?>>

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>


	<?php if( is_front_page() ): ?>
		<title><?php bloginfo( 'name' ); ?></title>
	<?php else: ?>
		<title><?php wp_title( '&nbsp;&nbsp;&mdash;&nbsp;&nbsp;', true, 'right' ) ?><?php bloginfo( 'name' ); ?></title>
	<?php endif; ?>

	<?php if( is_front_page() || is_page_template( 'page-about.php') ): ?>
		<meta name="description" content="<?php bloginfo( 'description' ); ?>">
	<?php elseif( is_single() ): ?>
		<?php
			$excerpt_description = wpautop( get_post_field( 'post_content', $post->ID) );
			$excerpt_description = substr( $excerpt_description, 0, strpos( $excerpt_description, '</p>' ) + 4 );
			$excerpt_description = strip_tags( $excerpt_description );
		?>
		<meta name="description" content="<?php echo $excerpt_description; ?>">
	<?php endif; ?>

	<?php wp_head(); ?>
</head>

<body <?php body_class( 'no-js' ); ?>>
	<script>
		document.body.className = document.body.className.replace('no-js', '');
	</script>
	<header class="committee-header unscrolled">
			<?php if( is_page_template( 'page-about.php') ): ?>
				<a href="<?php echo home_url(); ?>">
			<?php else: ?>
				<a href="<?php echo home_url( 'about' ); ?>">
			<?php endif; ?>
				<h1>
					<span>Demystification Committee</span>
				</h1>
			</a>
	</header>
	<div class="dc-site-contents">
