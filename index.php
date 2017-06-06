<?php get_header(); ?>

	<div id="container" class="notes">
		<header class="note-header page-header">
			<div class="breadcrumb"><a href="<?php echo home_url(); ?>">DC</a> &lt; </div>
			<div class="breadcrumb active"><a href="<?php dc_notes_url(); ?>">NOTES</a></div>
		</header>
		<div class="note-list">
			<?php if ( have_posts() ) : ?>
			
				<?php while ( have_posts() ) : the_post(); ?>
				<?php include 'post.php'; ?>
				<?php endwhile; ?>

			<?php endif; ?>				
		</div>	
		<?php the_posts_pagination( array(
			'prev_text'          => '&larr; Previous',
			'next_text'          => 'Next &rarr;'				
		) ); ?>
	</div>

<?php get_footer(); ?>
