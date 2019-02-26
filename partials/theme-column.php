<article id="<?php echo $theme->slug; ?>" class="theme theme__<?php echo $theme->slug; ?>" style="background-color: <?php echo $theme->placeholder_colour; ?>;">
	<div class="theme--image-cover" data-src="<?php echo $theme->image ?>" style=""></div>
	<div class="dc-scrollbar">
		<div class="dc-scrollbar--handle"></div>
	</div>
	<div class="theme-scroller-wrapper">
		<div class="theme--content">
			<header class="theme--leader">
				<h1><?php
					$name_parts = explode( ' ', $theme->name );
					foreach ($name_parts as $part):
				?><span>
					<?php echo $part; ?>
				</span><?php
				endforeach; ?></h1>
			</header>
			<div class="theme--follower">
				<?php if( $theme->description ): ?>
				<section class="theme--section theme--section__description">
					<p class="wysiwyg">
						<?php echo $theme->description; ?>
					</p>
				</section>
				<?php endif; ?>
				<section class="theme--section theme--section__work">
					<h2>Projects</h2>
					<ul>
						<?php
							$projects = dc_get_theme_projects( $theme->slug );
							if( $projects->have_posts() ):
								while( $projects->have_posts() ):
									$projects->the_post()
						?>
							<li class="theme-item theme-item__work theme-possible-title-container">
								<a href="<?php the_permalink(); ?>">
									<h2 class="theme-possible-title"><?php the_title(); ?></h2>
									<?php //the_post_thumbnail(); ?>
									<?php
										$thumb_id = get_post_thumbnail_id();
										$thumb = wp_get_attachment_image_src( $thumb_id, 'dc_huge' );
										$light_placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII=";
										$dark_placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOU+w8AAUEBH2QH9c4AAAAASUVORK5CYII=";
										$placeholder = ( $theme->slug === 'networks' ) ? $dark_placeholder : $light_placeholder;
									?>
									<img src="<?php echo $placeholder; ?>" width="<?php echo $thumb[1]; ?>" height="<?php echo $thumb[2]; ?>" data-src="<?php echo $thumb[0]; ?>" />
								</a>
							</li>
						<?php
								endwhile;
							endif;
						?>
					</ul>
				</section>
				<section class="theme--section theme--section__research theme-possible-title-container">
					<h2 class="theme-possible-title">Elsewhere</h2>
					<ul>
						<?php
							$research = dc_get_theme_research( $theme->slug );
							if( $research->have_posts() ):
								$index = $research->post_count;
								while( $research->have_posts() ):
									$research->the_post();
						?>
							<li class="theme-item theme-item__post" data-li-number="<?php echo $index; ?> ">
								<a href="<?php the_permalink(); ?>">
									<h3><?php the_title(); ?></h3>
								</a>
							</li>
						<?php
								$index--;
								endwhile;
							endif;
						?>
					</ul>
				</section>
				<section class="theme--section theme--section__notes theme-possible-title-container">
					<h2 class="theme-possible-title">
						<?php if( $theme->slug === 'networks' ): ?>
							Cloud
						<?php elseif( $theme->slug === 'offshore' ): ?>
							Pool
						<?php else: ?>
							Other
						<?php endif; ?>
					</h2>
					<ul>
						<?php
							$notes = dc_get_theme_notes( $theme->slug );
							if( $notes->have_posts() ):
								while( $notes->have_posts() ):
									$notes->the_post();
									global $post;
						?>
							<li class="theme-item theme-item__post theme-item__<?php echo $post->post_type; ?><?php if( has_post_thumbnail() ):?> theme-item__hasimg<?php endif; ?>">
									<h3 class="wysiwyg">
										<?php if( has_post_thumbnail() ):?>
											<div class="dc-hoverimg-trigger"></div>
										<?php endif; ?>
										<span class="text">
										<?php
											if( strlen($post->post_content) > 0 ){
												echo $post->post_content;
											} else {
												the_title();
											}
										?>
										</span>
									</h3>
									<?php if( has_post_thumbnail() ): ?>
										<img class="theme-item--hoverimg dc-hoverimg-img" data-src="<?php echo get_the_post_thumbnail_url( $post->ID, 'dc_normal' ); ?>">
									<?php endif; ?>
							</li>
						<?php
								endwhile;
							endif;
						?>
					</ul>
				</section>
			</div>
		</div>
	</div>
</article><?php
	wp_reset_postdata();
?>
