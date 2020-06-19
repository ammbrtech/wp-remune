<?php

/**
 *
 * @wordpress-plugin
 * Plugin Name:       Remune
 * Description:       Remune integration with WordPress.
 * Version:           1.0.0
 * Author:            SZ
 * Author URI:        https://remune.io
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'REMUNE_WIDGET_PATH', plugin_dir_path( __FILE__ ) . '/widget' );
define( 'REMUNE_ASSET_MANIFEST', REMUNE_WIDGET_PATH . '/build/asset-manifest.json' );
define( 'REMUNE_INCLUDES', plugin_dir_path( __FILE__ ) . '/includes' );
require_once( REMUNE_INCLUDES . '/enqueue.php' );


// add_shortcode( 'remune', 'remune_connect_func' );
//
// function remune_connect_func( $atts ) {
//     return '<div id="remune-wrapper"></div>';
// }

add_action('wp_footer', 'remune_connect_func');
function remune_connect_func() {
    echo '<div id="remune-wrapper"></div>';
}


add_action('admin_menu', 'remune_setup_menu');

function remune_setup_menu(){
  add_menu_page( 'Remune Config', 'Remune', 'manage_options', 'remune', 'remune_init' );
  add_action( 'admin_init', 'remune_plugin_settings' );
}

function remune_plugin_settings() {
	register_setting( 'remune-settings-group', 'remune_path' );
	register_setting( 'remune-settings-group', 'remune_id' );
}

function remune_init(){
  ?>
  <div class="wrap">
  <h1>Remune Settings</h1>

  <form method="post" action="options.php">
  <?php settings_fields( 'remune-settings-group' ); ?>
  <?php do_settings_sections( 'remune-settings-group' ); ?>
  <table class="form-table">
    <tr valign="top">
    <th scope="row">Remune Baseurl</th>
    <td><input type="text" name="remune_path" value="<?php echo esc_attr( get_option('remune_path') ); ?>" /></td>
    </tr>
		<tr valign="top">
    <th scope="row">Your Remune ID</th>
    <td><input type="text" name="remune_id" value="<?php echo esc_attr( get_option('remune_id') ); ?>" /></td>
    </tr>
  </table>

  <?php submit_button(); ?>

  </form>
  </div>
  <?php
}
