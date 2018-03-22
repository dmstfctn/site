<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<div class="layer layer__project project">
	<article class="quadrant-wrapper project-wrapper quadrant-wrapper__<?php echo dc_get_post_theme( get_the_ID() )->slug; ?>" id="project"><!--
	--><section class="quadrant-section project-section project-section__images dc-slideshow">
			<?php dc_project_media(); ?>
		</section><!--
	--><section class="quadrant-section project-section project-section__description">
			<header>
				<h1>
					<?php the_title(); ?>
				</h1>
			</header>
			<div class="wysiwyg">
				<?php the_content(); ?>
			</div>
		</section><!--
	--><section class="project-section project-section__close">
			<a href="<?php echo home_url() ?>" class="text-link no-decoration-link quadrant-close-link">Close</a>
		</section><!--
--></article>
</div>

<?php endwhile; endif; ?>

<?php get_footer(); ?>
