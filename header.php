<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>


	<?php if( is_front_page() ): ?>
		<title><?php bloginfo( 'name' ); ?></title>
	<?php else: ?>
		<title><?php wp_title( '&nbsp;&nbsp;&mdash;&nbsp;&nbsp;', true, 'right' ) ?><?php bloginfo( 'name' ); ?></title>
	<?php endif; ?>

	<meta name="description" content="<?php bloginfo( 'description' ); ?>">

	<?php wp_head(); ?>
	<?php include 'inc/dc_piwik_trackingcode.php'; ?>
</head>

<body <?php body_class(); ?>>
	<header class="committee-header">
		<h1>
			<a href="<?php echo home_url( 'about' ); ?>">
				<span>Demystification Committee</span>
				<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					 width="520.667px" height="79.333px" viewBox="0 0 520.667 79.333" enable-background="new 0 0 520.667 79.333"
					 xml:space="preserve">
					<g class="dc-full-logo">
						<path d="M35.143,65.521c-3.268,0.559-6.493,1.334-9.804,1.334c-4.644,0-6.708-0.904-6.708-3.956c0-2.623,1.118-4.73,2.236-5.806
							c2.279-2.149,5.762-2.451,9.589-2.451c2.494,0,4.773,0.216,7.439,0.603l2.709-10.147c-5.203-1.076-10.449-1.764-15.738-1.764
							c-4.859,0-10.406,0.645-13.932,4.344c-3.956,4.256-6.364,14.791-6.364,19.264c0,7.094,4.214,8.9,13.459,8.9
							c2.881,0,8.987-0.258,14.792-1.548L35.143,65.521L35.143,65.521z M60.447,53.482c2.967,0,4.171,1.376,4.171,3.611
							c0,3.483-1.634,6.795-2.107,7.654c-1.29,2.365-2.58,2.924-5.719,2.924c-1.763,0-3.913-0.73-3.913-3.912
							c0-1.549,0.989-5.031,2.15-7.225C56.578,53.611,58.34,53.482,60.447,53.482L60.447,53.482z M39.206,65.951
							c0,9.59,7.138,9.891,16.684,9.891c6.149,0,14.233-0.387,17.587-5.719c3.354-5.203,5.203-12.47,5.203-16.898
							c0-9.59-8.901-9.891-16.684-9.891c-7.826,0-14.233,0.774-17.931,6.665C41.012,54.901,39.206,61.523,39.206,65.951L39.206,65.951z
							 M78.241,74.939h12.642l4.558-16.771h0.086l1.204,16.771h7.654l10.148-16.254h0.086l-4.343,16.254h12.857l8.342-30.702H113.5
							l-9.073,16.512h-0.086V44.237H86.152L78.241,74.939L78.241,74.939z M128.976,74.939h12.642l4.558-16.771h0.086l1.204,16.771h7.654
							l10.148-16.254h0.086l-4.343,16.254h12.857l8.342-30.702h-17.974l-9.073,16.512h-0.086V44.237h-18.189L128.976,74.939
							L128.976,74.939z M178.998,74.939h12.943l8.342-30.702h-13.158L178.998,74.939L178.998,74.939z M203.207,74.939h13.373
							l5.332-20.555h8.643l2.752-10.147h-30.702l-2.752,10.147h8.686L203.207,74.939L203.207,74.939z M234.996,74.939h13.373
							l5.332-20.555h8.644l2.752-10.147h-30.703l-2.752,10.147h8.686L234.996,74.939L234.996,74.939z M259.208,74.939h31.647l2.107-8.171
							h-18.318l0.732-2.751h18.316l1.721-6.623h-18.318l0.859-3.439h18.318l2.537-9.718H267.12L259.208,74.939L259.208,74.939z
							 M295.905,74.939h31.648l2.105-8.171h-18.316l0.73-2.751h18.318l1.719-6.623h-18.316l0.859-3.439h18.318l2.537-9.718h-31.691
							L295.905,74.939L295.905,74.939z"/>
						<path d="M3.667,34.938h25.241c4.386,0,9.89-2.193,12.212-8.514c2.15-5.719,3.268-9.589,3.268-13.459
							c0-7.095-4.429-8.729-9.116-8.729h-23.22L3.667,34.938L3.667,34.938z M22.5,14.385h4.3c2.623,0,3.526,0.86,3.526,2.924
							c0,0.731-0.215,1.892-0.86,4.472c-0.645,2.666-2.451,4.988-5.461,4.988h-4.902L22.5,14.385L22.5,14.385z M43.948,34.938h31.648
							l2.107-8.17H59.385l0.731-2.752h18.318l1.72-6.622H61.836l0.86-3.44h18.318l2.537-9.718H51.86L43.948,34.938L43.948,34.938z
							 M80.743,34.938h12.642l4.558-16.77h0.086l1.204,16.77h7.654l10.148-16.254h0.086l-4.343,16.254h12.857l8.342-30.702h-17.974
							l-9.073,16.512h-0.086V4.237H88.654L80.743,34.938L80.743,34.938z M136.668,34.938h15.738l22.317-30.702h-15.222l-7.869,13.545
							h-0.129l-1.677-13.545h-14.362l6.407,23.693L136.668,34.938L136.668,34.938z M167.297,34.423
							c5.719,1.032,11.567,1.419,18.447,1.419c8.471,0,12.771-0.817,15.437-5.117c0.903-1.462,2.021-4.816,2.021-7.224
							c0-6.45-4.3-6.665-9.202-6.665c-6.751,0-7.611-0.344-7.611-1.591c0-1.462,1.204-2.193,6.321-2.193c4.214,0,8.342,0.43,12.513,0.946
							l2.709-9.503c-6.278-0.946-13.201-1.161-17.501-1.161c-3.182,0-7.353,0.086-10.234,0.903c-5.16,1.462-8.6,6.837-8.6,13.459
							c0,4.816,4.343,6.149,8.299,6.149c7.697,0,8.471,0.301,8.471,1.806c0,2.021-3.01,2.021-4.429,2.021
							c-4.945,0-9.804-0.387-14.706-0.989L167.297,34.423L167.297,34.423z M210.745,34.938h13.373l5.332-20.554h8.643l2.752-10.148
							h-30.702l-2.752,10.148h8.686L210.745,34.938L210.745,34.938z M235.086,34.938h12.943l8.342-30.702h-13.158L235.086,34.938
							L235.086,34.938z M253.804,34.938h13.115l2.107-8.041h17.758l2.408-8.987h-17.715l0.902-3.526h17.76l2.752-10.148h-31.176
							L253.804,34.938L253.804,34.938z M290.272,34.938h12.943l8.342-30.702h-13.158L290.272,34.938L290.272,34.938z M341.243,25.521
							c-3.268,0.559-6.492,1.333-9.803,1.333c-4.645,0-6.709-0.903-6.709-3.956c0-2.623,1.119-4.73,2.236-5.805
							c2.279-2.15,5.762-2.451,9.59-2.451c2.494,0,4.771,0.215,7.438,0.602l2.709-10.148c-5.201-1.075-10.447-1.763-15.736-1.763
							c-4.859,0-10.406,0.645-13.934,4.343c-3.955,4.257-6.363,14.792-6.363,19.264c0,7.095,4.215,8.901,13.459,8.901
							c2.881,0,8.986-0.258,14.793-1.548L341.243,25.521L341.243,25.521z M340.143,34.938h14.705l2.666-4.472h10.836v4.472h13.244V4.237
							H358.59L340.143,34.938L340.143,34.938z M368.35,23.071h-6.879l6.793-11.051h0.086V23.071L368.35,23.071z M388.383,34.938h13.373
							l5.332-20.554h8.643l2.752-10.148h-30.701l-2.752,10.148h8.686L388.383,34.938L388.383,34.938z M412.725,34.938h12.943
							l8.342-30.702h-13.158L412.725,34.938L412.725,34.938z M454.461,13.482c2.967,0,4.17,1.376,4.17,3.612
							c0,3.483-1.635,6.794-2.107,7.654c-1.289,2.365-2.58,2.924-5.719,2.924c-1.762,0-3.912-0.731-3.912-3.913
							c0-1.548,0.988-5.031,2.15-7.224C450.59,13.611,452.354,13.482,454.461,13.482L454.461,13.482z M433.219,25.952
							c0,9.589,7.137,9.89,16.684,9.89c6.148,0,14.232-0.387,17.586-5.719c3.355-5.203,5.203-12.47,5.203-16.899
							c0-9.589-8.9-9.89-16.684-9.89c-7.826,0-14.232,0.774-17.932,6.665C435.024,14.901,433.219,21.522,433.219,25.952L433.219,25.952z
							 M472.163,34.938h13.244l4.258-15.996h0.086l3.611,15.996h14.619l8.258-30.702h-13.244l-4.645,17.802h-0.086l-2.752-17.802H480.42
							L472.163,34.938L472.163,34.938z"/>
					</g>
				</svg>
			</a>
		</h1>
	</header>
	<div class="dc-site-contents">
		<div class="layer layer__committee">
			<!-- replaced by about content when that gets loaded -->
		</div>
