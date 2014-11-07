<?php
/**
 * Sets up relational Custom Posts with the Posts to Posts library.
 *
 * @package    Directory
 * @subpackage Includes
 * @since      0.1.0
 * @author     Marty Helmick <info@martyhelmick.com>
 * @copyright  Copyright (c) 2013 - 2014, Marty Helmick
 * @link       https://github.com/m-e-h/directory
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

add_action( 'p2p_init', 'dept_to_people_connection' );

/**
 * Registers connections between people and departments.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function dept_to_people_connection() {
	  // Make sure the Posts 2 Posts plugin is active.
	// if ( !function_exists( 'p2p_register_connection_type' ) )
	//     return;

	p2p_register_connection_type( array(
		'name' => 'departments_to_people',
		'from' => 'department',
		'to' => 'people',
		'admin_box' => array(
		  'context' => 'side'
		  ),
		'from_labels' => array(
		'create' => __( 'Add Department', 'hybrid-base' ),
		),
		'to_labels' => array(
		'create' => __( 'Add People', 'hybrid-base' ),
		),
		'cardinality' => 'one-to-many',
		'sortable' => 'any',
		'title' => array( 'from' => 'People', 'to' => 'Department' ),
		'fields' => array(
			'status' => array(
				'title' => 'Status',
				'type' => 'select',
				'values' => array( 'Active', 'Retired', 'Deceased', 'On Leave' )
			),
			'job-title' => array(
				'title' => 'Title',
				'type' => 'text',
		),
		)
	) );
}