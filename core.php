<?php
/**
*  A hacky custom plugin to display a rolling list of tweets delivered via AJAX requests
*
*
* @package   Ajax/Twitter
* @author    Michael Keith
* @license   GPL-2.0+
*
* @wordpress-plugin
*  Plugin Name:       Ajax/Twitter
*  Description:       Custom plugin for coursework 1. Feeds and displays tweets based on the user's progress on the page.
*  Version:           0.5
*  Author:            Michael Keith
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

// Set some constants
define( 'CORE_DIR', plugin_dir_path( __FILE__ ) );
define( 'CORE_URL', plugins_url( '', __FILE__ ) );

//Ajax Hooks
add_action('wp_ajax_test_action', 'get_tweet_action');
add_action('wp_ajax_nopriv_test_action', 'get_tweet_action');

//Only load the js and css on one specific page. There is probably a better way of doing this, but I could't find anything better for this specific use case online.
if( $_SERVER["REQUEST_URI"] == "/index.php/2018/10/24/test/") {

	//Include CSS files
	wp_register_style( 'css', plugin_dir_url(__FILE__) . 'ajax_twitter.css' );
	wp_enqueue_style('css');

	//Include the javascript files and pass them the necessary variables
	wp_enqueue_script('twitter_script', plugin_dir_url(__FILE__) . 'twitter.js', false, false, false);
	wp_enqueue_script('script', plugin_dir_url(__FILE__) . 'ajax_twitter.js', false, false, true);
	wp_localize_script( 'script', 'ajax', array( 'ajax_url' => admin_url( 'admin-ajax.php' )) );

}

function get_tweet_action() {

	//(This is obviously not optimal)
	require_once(CORE_DIR . "tweet_ids.php");

	global $wpdb;

	$data = $_POST["data"];

	if($data == 0) {
		echo (string)$zero[rand(0,count($zero))];
	}
	else if($data == 1) {
		echo (string)$one[rand(0,count($one))];
	}
	else if($data == 2) {
		echo (string)$two[rand(0,count($two))];
	}
	else if($data == 3) {
		echo (string)$three[rand(0,count($three))];
	}
	else if($data == 4) {
		echo (string)$four[rand(0,count($four))];
	}
	else if($data == 5) {
		echo (string)$four[rand(0,count($four))];
	}

	die();
}
