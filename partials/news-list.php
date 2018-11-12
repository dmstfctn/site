<div class="collapsible-panel collapsed">
	<div class="collapsible-panel--content">
		<h3>Flow</h3>
		<ul class="news-items">
<?php
	$news = dc_get_news();
	$news_index = 0;
	$news_collapsible_created = false;
	if( $news->have_posts() ): while( $news->have_posts() ):
		$news->the_post();
		global $post;
		if( $post->post_type === 'dc_social_instagram' && !has_post_thumbnail() ){
			continue;
		}
	?>
	<li class="theme-item theme-item__post theme-item__<?php echo $post->post_type; ?> theme-item__type-<?php echo $post->post_type; ?><?php if( has_post_thumbnail() ):?> theme-item__hasimg<?php endif; ?>">
		<?php if( $post->post_type !== 'dc_social_instagram' && $post->post_type !== 'dc_social_twitter' ): ?>
			<a href="<?php the_permalink() ?>">
		<?php endif; ?>
		<h3 class="wysiwyg">
			<?php if( has_post_thumbnail() ):?>
				<div class="dc-hoverimg-trigger"></div>
			<?php endif; ?>
			<span class="text">
				<?php if( $post->post_type === 'dc_social_instagram' || $post->post_type === 'dc_social_twitter' ){
					the_content();
				} else {
					the_title();
				}?>
			</span>
		</h3>
		<?php if( has_post_thumbnail() ): ?>
			<img class="theme-item--hoverimg dc-hoverimg-img" data-src="<?php echo get_the_post_thumbnail_url( $post->ID, 'dc_normal' ); ?>">
		<?php endif; ?>
		<?php if( $post->post_type !== 'dc_social_instagram' && $post->post_type !== 'dc_social_twitter' ): ?>
			</a>
		<?php endif; ?>
	</li>
<?php
	endwhile; endif;
	wp_reset_postdata();
?>
</ul>
</div>
<div class="collapsible-panel--toggle">
</div>
</div>
