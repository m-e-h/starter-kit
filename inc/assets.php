<?php
/**
 * Register scripts and styles.
 *
 * @package Abraham
 */

/* Add custom scripts. */
add_action( 'wp_enqueue_scripts', 'abraham_scripts', 5 );

/* Add custom styles. */
add_action( 'wp_enqueue_scripts', 'abraham_styles', 5 );

/* Register custom image sizes. */
add_action( 'init', 'abraham_image_sizes', 5 );


function abraham_scripts() {

	$suffix = hybrid_get_min_suffix();

	wp_enqueue_script( 'abraham-main', trailingslashit( get_template_directory_uri() ) . 'js/main.js', [], null, true );
}

function abraham_styles() {
	$suffix = hybrid_get_min_suffix();

	wp_enqueue_style( 'font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css' );

	wp_enqueue_style( 'abraham-fonts', '//fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic' );

	if ( is_child_theme() )
		wp_enqueue_style( 'parent', trailingslashit( get_template_directory_uri() ) . "style{$suffix}.css" );

	wp_enqueue_style( 'style', get_stylesheet_uri() );
}

function abraham_image_sizes() {
	// Set the 'post-thumbnail' size.
	set_post_thumbnail_size( 175, 130, true );

	// Add the 'abraham-full' image size.
	add_image_size( 'abraham-full', 1025, 500, true );
}
