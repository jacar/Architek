<?php
if (!defined('ABSPATH')) exit;

function archtek_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('elementor');
}
add_action('after_setup_theme', 'archtek_theme_support');
