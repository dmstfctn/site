<?php /* Template Name: Home Page */ ?>
<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<div class="layer layer__themes themes">
	<?php dc_theme_columns(); ?>
</div>
<?php endwhile; endif; ?>

<?php get_footer(); ?>
