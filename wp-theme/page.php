<?php
$is_elementor = isset($_GET['elementor-preview']) || (class_exists('\Elementor\Plugin') && \Elementor\Plugin::$instance->editor->is_edit_mode());
?>
<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
    <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
    
    <?php if (!$is_elementor) : ?>
      <script>
        window.ARCHTEK_CAN_EDIT = <?php echo (is_user_logged_in() && current_user_can('edit_posts')) ? 'true' : 'false'; ?>;
      </script>
      <script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/assets/index-dbLuO2q7.js"></script>
      <link rel="stylesheet" crossorigin href="<?php echo get_template_directory_uri(); ?>/assets/index-C-2SqA8J.css">
    <?php endif; ?>
    
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    
    <?php if (!$is_elementor) : ?>
      <div id="root"></div>
    <?php endif; ?>

    <div class="elementor-content-area" style="<?php echo $is_elementor ? 'display:block; min-height: 100vh;' : 'display:none;'; ?>">
      <?php
      if ( have_posts() ) :
          while ( have_posts() ) : the_post();
              the_content();
          endwhile;
      endif;
      ?>
    </div>

    <?php wp_footer(); ?>
  </body>
</html>
