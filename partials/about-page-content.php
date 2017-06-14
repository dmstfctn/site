<div class="layer layer__committee tabs--top-theme">
	<div class="about-fake-tabs">
		<div class="theme">
			<div class="theme--leader">
				<h1>
					<a href="<?php echo home_url('#offshore-studies'); ?>">
						Offshore
					</a>
				</h1>
			</div>
		</div>
		<div class="theme theme__network-ensemble">
			<div class="theme--leader">
				<a href="<?php echo home_url('#network-ensemble'); ?>">
					<h1>Network</h1>
				</a>
			</div>
		</div>
	</div>
	<article class="about-wrapper" id="about">
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
		<aside class="about--extra about--pane">
			<div class="about-extra--section about--section about--section__contact">
				<div class="wysiwyg">
					<?php echo $contact; ?>
				</div>
			</div>
			<div class="about-extra--section about--section about--section__news">
				<h2>Notes</h2>
				<?php include( 'news-list.php'); ?>
			</div>
		</aside>
	</article>
</div>
