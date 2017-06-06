<?php /* Template Name: About */ ?>

<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<div class="layer layer__committee about">
		<article class="about-wrapper" id="about">
			<aside class="about--extra">
				<a href="<?php echo home_url(); ?>" class="text-link">&larr; Home</a>
			</aside>
			<section class="about--content">
				<div class="wysiwyg">
					<?php the_content(); ?>
				</div>
			</section>
		</article>
	</div>
<?php endwhile; endif; ?>

<?php get_footer(); ?>
