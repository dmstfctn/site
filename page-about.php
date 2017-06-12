<?php /* Template Name: About */ ?>

<?php get_header(); ?>


	<div class="layer layer__committee">
		<article class="about-wrapper" id="about">
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
				<section class="about--content about--pane">
					<div class="about-content--section about--section">
						<div class="wysiwyg">
							<?php the_content(); ?>
						</div>
						<div class="collapsible-panel collapsed">
							<div class="collapsible-panel--content">
								<div class="wysiwyg about--section">
									<?php the_field('extended_bio'); ?>
								</div>
								<?php
									$sections = get_field('about_sections');
									foreach( $sections as $section ):
								?>
								<div class="about-content--section about--section">
									<h2><?php echo $section['about_sections_title']; ?></h2>
									<div class="wysiwyg">
										<?php echo $section['about_sections_content']; ?>
									</div>
								</div>
								<?php endforeach; ?>
							</div>
							<div class="collapsible-panel--toggle">
							</div>
						</div>
					</div>
				</section>
				<?php
					$contact = get_field('contact');
				?>
			<?php endwhile; endif; ?>
			<aside class="about--extra about--pane">
				<!--<a href="<?php echo home_url(); ?>" class="text-link no-decoration-link layer-close-link">Home</a>-->
				<div class="about-extra--section about--section about--section__contact">
					<div class="wysiwyg">
						<?php echo $contact; ?>
					</div>
				</div>
				<div class="about-extra--section about--section about--section__news">
					<h2>Notes</h2>
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
							if( $news_index > 2 && !$news_collapsible_created ):
								$news_collapsible_created = true;
								?>
							</ul>
							<div class="collapsible-panel collapsed">
								<div class="collapsible-panel--content">
									<ul class="news-items">
							<?php endif; ?>
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
						$news_index++;
						endwhile; endif;
						wp_reset_postdata();
					?>
					</ul>
					</div>
						<div class="collapsible-panel--toggle">
					</div>
				</div>

				</div>
			</aside>
		</article>
	</div>

<?php get_footer(); ?>
