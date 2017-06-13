	<?php if( !is_front_page() && !is_archive() ): ?>
		<div class="layer layer__themes themes">
			<!-- replaced by theme columns when they're loaded -->
			<article  class="theme">
				<div class="theme--image-cover"></div>
				<div class="theme--content">
					<header class="theme--leader"></header>
					<div class="theme--follower"></div>
				</div>
			</article><!--
	 --><article  class="theme">
				<div class="theme--image-cover"></div>
				<div class="theme--content">
					<header class="theme--leader"></header>
					<div class="theme--follower"></div>
				</div>
			</article>
		</div>
	<?php endif; ?>
	<?php if( !is_singular('dc_project') ): ?>
		<div class="layer layer__project project">
			<!-- replaced by projects when they're loaded -->
		</div>
	<?php endif; ?>
	<?php if( !is_singular('post') ): ?>
		<div class="layer layer__post post">
			<!-- replaced by posts when they're loaded -->
		</div>
	<?php endif; ?>
	<?php if( !is_page_template('page-about.php') ): ?>
		<div class="layer layer__committee">
			<!-- replaced by about content when that gets loaded -->
		</div>
	<?php endif; ?>

	</div><!-- end .dc-site-contents -->
	<div class="dc-site-loader"></div>
	<div id="handle-x" class="handle handle__x">
		<div class="indicator"></div>
	</div>
	<div id="handle-y" class="handle handle__y">
		<div class="indicator"></div>
	</div>
<?php wp_footer(); ?>
</body>
</html>
