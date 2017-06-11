<!DOCTYPE html>
<html <?php language_attributes(); ?>>

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

	<meta name="description" content="<?php bloginfo( 'description' ); ?>">

	<?php wp_head(); ?>
	<?php include 'inc/dc_piwik_trackingcode.php'; ?>
</head>

<body <?php body_class( 'no-js' ); ?>>
	<header class="committee-header">
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
