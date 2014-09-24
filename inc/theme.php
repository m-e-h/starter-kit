<?php

/* Register custom image sizes. */
add_action( 'init', 'abraham_image_sizes', 5 );

/* Register custom menus. */
add_action( 'init', 'abraham_register_menus', 5 );

/* Register sidebars. */
add_action( 'widgets_init', 'abraham_widgets_init', 5 );

/* Add custom scripts. */
add_action( 'wp_enqueue_scripts', 'abraham_scripts', 5 );

/**
 * Registers custom image sizes for the theme.
 */
function abraham_image_sizes() {

	/* Sets the 'post-thumbnail' size. */
	set_post_thumbnail_size( 150, 150, true );

  /* Adds the 'medium-square' image size. */
	add_image_size( 'medium-square', 300, 300, true );
}

/**
 * Registers nav menu locations.
 */
function abraham_register_menus() {
	register_nav_menu( 'primary',    _x( 'Primary',    'nav menu location', 'abraham' ) );
	register_nav_menu( 'secondary',  _x( 'Secondary',  'nav menu location', 'abraham' ) );
	register_nav_menu( 'social', 		 _x( 'Social',     'nav menu location', 'abraham' ) );
}

/**
 * Register widget area.
 */
function abraham_widgets_init() {

	hybrid_register_sidebar( array(
    'name'          => _x( 'Primary Sidebar', 'sidebar', 'abraham' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'The primary sidebar. Typically on the left.', 'abraham' ),
    'before_widget' => '<aside id="%1$s" class="primary widget %2$s">',
    'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="primary-title">',
		'after_title'   => '</h2>',
	) );

	hybrid_register_sidebar( array(
		'name'          => _x( 'Secondary Sidebar', 'sidebar', 'abraham' ),
		'id'            => 'sidebar-2',
		'description'   => __( 'The secondary sidebar. Typically on the right.', 'abraham' ),
		'before_widget' => '<aside id="%1$s" class="secondary widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

		hybrid_register_sidebar( array(
    'name'          => _x( 'Footer Widget Area', 'sidebar', 'abraham' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Footer widgets.', 'abraham' ),
    'before_widget' => '<aside id="%1$s" class="subsidiary widget %2$s">',
    'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="subsidiary-title">',
		'after_title'   => '</h2>',
	) );
}

/**
 * Enqueue scripts and styles.
 */
function abraham_scripts() {

  $suffix = hybrid_get_min_suffix();

  wp_register_script( 'meh-mainjs', trailingslashit( get_template_directory_uri() ) . "js/main{$suffix}.js", array(), null, true );

  wp_enqueue_script( 'meh-mainjs' );

  /* Register Google-fonts. */
  wp_register_style( 'meh-fonts', '//fonts.googleapis.com/css?family=RobotoDraft:300,400,500|Fira+Sans:300,400,500,700|Source+Code+Pro:400,700' );

  /* Register Font Awesome. */
  wp_register_style( 'meh-font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css' );
}
