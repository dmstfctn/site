<?php /* Template Name: About */ ?>

<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<div class="layer layer__committee">
		<article class="about-wrapper" id="about">
			<section class="about--content">
				<div class="wysiwyg">
					<?php the_content(); ?>
				</div>
			</section>
			<aside class="about--extra">
				<a href="<?php echo home_url(); ?>" class="text-link no-decoration-link">Home</a>
			</aside>
		</article>
	</div>
<?php endwhile; endif; ?>

<?php get_footer(); ?>
