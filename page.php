<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<div class="layer layer__post post">
		<?php
			$theme_slug = dc_get_post_theme( get_the_ID() )->slug;
			if( strlen( $theme_slug ) <= 0 ){
				$theme_slug = 'committee';
			}
		?>
		<article class="quadrant-wrapper post-wrapper page-wrapper quadrant-wrapper__<?php echo $theme_slug; ?>">
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
