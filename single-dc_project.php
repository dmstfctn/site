<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<div class="layer layer__project project layer__<?php echo dc_get_post_theme( get_the_ID() )->slug; ?>">
	<div class="about-fake-tabs">
		<div class="theme">
			<div class="theme--leader">
				<h1>
					<a href="<?php echo home_url('#offshore'); ?>">
						Offshore
					</a>
				</h1>
			</div>
		</div>
		<div class="theme theme__networks">
			<div class="theme--leader">
				<a href="<?php echo home_url('#networks'); ?>">
					<h1>Networks</h1>
				</a>
			</div>
		</div>
	</div>
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
			<div class="scrollinner">
				<div class="wysiwyg">
					<?php the_content(); ?>
					<?php $related_notes = dc_get_project_related_list( $theme_slug ); ?>
					<?php if( count($related_notes) > 0 ): ?>
					<div class="post--related-content">
					<h2>
						Related
						<?php dc_text_arrow(); ?>
					</h2>
					<?php foreach( $related_notes as $note ): ?>
							<?php echo $note; ?>
					<?php endforeach; ?>
					</div>
					<?php endif;?>
				</div>
			</div>
		</section><!--
	--><section class="project-section project-section__close">
			<a href="<?php echo home_url() ?>" class="text-link no-decoration-link quadrant-close-link">Close</a>
		</section><!--
--></article>
</div>

<?php endwhile; endif; ?>

<?php get_footer(); ?>
