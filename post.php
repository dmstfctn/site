<?php
	$theme_slug = dc_get_post_theme( get_the_ID() )->slug;
	if( strlen( $theme_slug ) <= 0 ){
		$theme_slug = 'committee';
	}
?>
<article class="quadrant-wrapper post-wrapper quadrant-wrapper__<?php echo $theme_slug; ?>">
	<header class="quadrant-section post-section post-section__related" data-section-location="nw">
			<div class="post--related-content">
			<h2>
				Related
				<?php dc_text_arrow(); ?>
			</h2>
			<?php
				$related_notes = dc_get_post_related_list( $theme_slug );
				foreach( $related_notes as $note ){
					if( $note->ID !== get_the_ID() ):
					?>
					<a href="<?php echo $note->guid; ?>"><span><?php echo $note->post_title; ?></span></a>
					<?php
					endif;
				}
			?>
			</div>
	</header><!--
--><section class="quadrant-section post-section post-section__contents">
		<header>
			<h1>
				<?php the_title(); ?>
			</h1>
		</header>
		<div class="wysiwyg">
			<?php
				the_content();
				if(get_post_type() === 'dc_social_twitter' ||  get_post_type() === 'dc_social_instagram' ){
					the_post_thumbnail();
				}
			?>
		</div>
	</section><!--
--><section class="post-section post-section__close" data-section-location="se">
		<a href="<?php echo home_url() ?>" class="text-link no-decoration-link quadrant-close-link">Close</a>
	</section>
</article>
