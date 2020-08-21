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
if (! defined('WPINC')) {
    die;
}

define('REMUNE_WIDGET_PATH', plugin_dir_path(__FILE__) . '/widget');
define('REMUNE_ASSET_MANIFEST', REMUNE_WIDGET_PATH . '/build/asset-manifest.json');
define('REMUNE_INCLUDES', plugin_dir_path(__FILE__) . '/includes');
require_once(REMUNE_INCLUDES . '/enqueue.php');

add_action('wp_footer', 'remune_connect_func');
function remune_connect_func()
{
    echo '<div id="remune-wrapper"></div>';
}


add_action('admin_menu', 'remune_setup_menu');

function remune_setup_menu()
{
    add_menu_page('Remune Config', 'Remune', 'manage_options', 'remune', 'remune_init');
    add_action('admin_init', 'remune_plugin_settings');
}

function remune_plugin_settings()
{
    register_setting('remune-settings-group', 'remune_path');
    register_setting('remune-settings-group', 'remune_id');
    register_setting('remune-settings-group', 'remune_secret');
}

function remune_init()
{
    ?>
  <div class="remune-wrapper">
  <h1>Remune Settings</h1>

  <form method="post" action="options.php" class="remune-option-form">
  <?php settings_fields('remune-settings-group'); ?>
  <?php do_settings_sections('remune-settings-group'); ?>
  <table class="form-table">
    <tr valign="top">
      <th scope="row" class="label">Your Remune Handle</th>
      <td><input type="text" class="text-field" name="remune_id" value="<?php echo esc_attr(get_option('remune_id')); ?>" /></td>
		<td rowspan="4" style="width:50%">
			<div class="plugin-img"><img src="<?php echo plugins_url('/images/remune-logo.svg', __FILE__); ?>"/><div></td>
		</tr>
		<tr valign="top">
    <th scope="row" class="label">Access Token</th>
    <td><input type="text" class="text-field" name="remune_secret" value="<?php echo esc_attr(get_option('remune_secret')); ?>" /></td>
    </tr>
  </table>

  <?php submit_button(); ?>

  </form>
  </div>
  <?php
}

add_action('init', 'remune_register_style');
function remune_register_style()
{
    wp_register_style('remune_style', plugins_url('/css/remune.css', __FILE__), false, '1.0.0', 'all');
}

add_action('admin_enqueue_scripts', 'remune_enqueue_style');
function remune_enqueue_style()
{
    wp_enqueue_style('remune_style');
}
