<article id="pane-<?php echo $theme->slug; ?>" class="theme theme__<?php echo $theme->slug; ?>" >
	<div class="theme--image-cover" style="background-image: url('<?php echo $theme->image ?>')"></div>
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
				<section class="theme--section theme--section__description">
					<p>
						<?php echo $theme->description; ?>
					</p>
				</section>
				<section class="theme--section theme--section__work">
					<h2>Projects</h2>
					<ul>
						<?php
							$projects = dc_get_theme_projects( $theme->slug );
							if( $projects->have_posts() ):
								while( $projects->have_posts() ):
									$projects->the_post()
						?>
							<li class="theme-item theme-item__work">
								<a href="<?php the_permalink(); ?>">
									<h2><?php the_title(); ?></h2>
									<?php the_post_thumbnail(); ?>
								</a>
							</li>
						<?php
								endwhile;
							endif;
						?>
					</ul>
				</section>
				<section class="theme--section theme--section__research">
					<h2>Research</h2>
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
				<section class="theme--section theme--section__notes">
					<h2>Notes</h2>
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
