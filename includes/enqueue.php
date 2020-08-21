<?php
// This file enqueues scripts and styles

defined('ABSPATH') or die('Direct script access disallowed.');

add_action('init', function () {
    add_filter('script_loader_tag', function ($tag, $handle) {
        if (! preg_match('/^remune-/', $handle)) {
            return $tag;
        }
        return str_replace(' src', ' async defer src', $tag);
    }, 10, 2);

    add_action('wp_enqueue_scripts', function () {
        $asset_manifest = json_decode(file_get_contents(REMUNE_ASSET_MANIFEST), true)['files'];

        if (isset($asset_manifest[ 'main.css' ])) {
            wp_enqueue_style('remune', get_site_url() . $asset_manifest[ 'main.css' ]);
        }

        wp_enqueue_script('remune-runtime', get_site_url() . $asset_manifest[ 'runtime-main.js' ], array(), null, true);

        wp_enqueue_script('remune-main', get_site_url() . $asset_manifest[ 'main.js' ], array('remune-runtime'), null, true);

        foreach ($asset_manifest as $key => $value) {
            if (preg_match('@static/js/(.*)\.chunk\.js@', $key, $matches)) {
                if ($matches && is_array($matches) && count($matches) === 2) {
                    $name = "remune-" . preg_replace('/[^A-Za-z0-9_]/', '-', $matches[1]);
                    wp_enqueue_script($name, get_site_url() . $value, array( 'remune-main' ), null, true);
                }
            }

            if (preg_match('@static/css/(.*)\.chunk\.css@', $key, $matches)) {
                if ($matches && is_array($matches) && count($matches) == 2) {
                    $name = "remune-" . preg_replace('/[^A-Za-z0-9_]/', '-', $matches[1]);
                    wp_enqueue_style($name, get_site_url() . $value, array( 'remune' ), null);
                }
            }
        }
    });
});

function remune_load_scripts()
{
    wp_enqueue_script('remune-script', get_template_directory_uri() . '/test.js');
    wp_localize_script(
        'remune-script',
        'remune_script_vars',
        array(
            'basepath' => "https://api.remune.io",
            'remune_id' => esc_attr(get_option('remune_id')),
            'base_url' => get_bloginfo('wpurl'),
            'secret' => esc_attr(get_option('remune_secret'))
        )
    );
}
add_action('wp_enqueue_scripts', 'remune_load_scripts');
