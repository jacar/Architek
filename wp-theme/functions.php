<?php
if (!defined('ABSPATH')) exit;

function archtek_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('elementor');
}
add_action('after_setup_theme', 'archtek_theme_support');

// Allow WebP uploads in WordPress Media Library
function archtek_mime_types($mimes) {
    $mimes['webp'] = 'image/webp';
    return $mimes;
}
add_filter('upload_mimes', 'archtek_mime_types');

// Ensure dynamic HTML documents are always revalidated so new bundles and assets take effect instantly
function archtek_cache_headers() {
    if (!is_admin() && !is_user_logged_in()) {
        header_remove('Pragma');
        header('Cache-Control: no-cache, must-revalidate, max-age=0');
    }
}
add_action('send_headers', 'archtek_cache_headers');
