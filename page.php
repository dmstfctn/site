<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<div class="layer layer__post post">
		<article class="quadrant-wrapper post-wrapper page-wrapper">
			<header class="quadrant-section post-section post-section__title" data-section-location="nw">
				<h1>
					<?php the_title(); ?>
				</h1>
			</header><!--
		--><section class="quadrant-section post-section post-section__contents">
				<div class="wysiwyg">
					<?php
						the_content();
						if(get_post_type() === 'dc_social_twitter' ||  get_post_type() === 'dc_social_instagram' ){
							the_post_thumbnail();
						}
					?>
				</div>
			</section><!--
		--><section class="quadrant-section post-section post-section__close" data-section-location="se">
				<a href="<?php echo home_url() ?>">Close</a>
			</section>
		</article>

	</div>
<?php endwhile; endif; ?>

<?php get_footer(); ?>
