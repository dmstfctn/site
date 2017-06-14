<?php /* Template Name: About */ ?>

<?php get_header(); ?>

<?php
	if ( have_posts() ) : while ( have_posts() ) : the_post();
		include( 'partials/about-page-content.php' );
	endwhile; endif;
?>

<?php get_footer(); ?>
