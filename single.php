<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<div class="layer layer__post post">
		<?php include 'post.php'; ?>
	</div>
<?php endwhile; endif; ?>

<?php get_footer(); ?>
