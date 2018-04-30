<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<div class="layer layer__post post layer__<?php echo dc_get_post_theme( get_the_ID() )->slug; ?>">
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
		<?php include 'post.php'; ?>
	</div>
<?php endwhile; endif; ?>

<?php get_footer(); ?>
