<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<div class="layer layer__project project">
	<article class="quadrant-wrapper project-wrapper quadrant-wrapper__<?php echo dc_get_post_theme( get_the_ID() )->slug; ?>" id="project">
		<header class="quadrant-section project-section project-section__title" data-section-location="nw">
			<h1>
				<?php the_title(); ?>
			</h1>
		</header><!--
	--><section class="quadrant-section project-section project-section__images dc-slideshow">
			<?php dc_project_media(); ?>
		</section><!--
	--><section class="quadrant-section project-section project-section__description">
			<div class="wysiwyg">
				<?php the_content(); ?>
			</div>
		</section><!--
	--><section class="quadrant-section project-section project-section__close" data-section-location="se">
			<a href="<?php echo home_url() ?>">Close</a>
		</section>
	</article>
</div>

<?php endwhile; endif; ?>

<?php get_footer(); ?>
