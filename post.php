<?php
	$theme_slug = dc_get_post_theme( get_the_ID() )->slug;
	if( strlen( $theme_slug ) <= 0 ){
		$theme_slug = 'committee';
	}
?>
<article class="quadrant-wrapper post-wrapper quadrant-wrapper__<?php echo $theme_slug; ?>">
	<header class="quadrant-section post-section post-section__related" data-section-location="nw">
		
	</header><!--
--><section class="quadrant-section post-section post-section__contents">
		<header>
			<h1>
				<?php the_title(); ?>
			</h1>
		</header>
		<div class="scrollinner">
			<div class="wysiwyg">
				<?php
					the_content();
					if(get_post_type() === 'dc_social_twitter' ||  get_post_type() === 'dc_social_instagram' ){
						the_post_thumbnail();
					}
				?>
			</div>
		</div>
	</section><!--
--><section class="post-section post-section__close" data-section-location="se">
		<a href="<?php echo home_url() ?>" class="text-link no-decoration-link quadrant-close-link">Close</a>
	</section>
</article>
