import fs from 'fs';
import path from 'path';

// Define theme details
const themeName = 'Archtek Studio Premium';
const themeDir = path.join(process.cwd(), 'wp-theme');
const distDir = path.join(process.cwd(), 'dist');

// Create theme directory
if (!fs.existsSync(themeDir)) {
  fs.mkdirSync(themeDir);
}

// 1. Create style.css (Required by WordPress)
const styleCss = `/*
Theme Name: ${themeName}
Author: Antigravity AI
Description: A premium React/Vite headless-style theme for Archtek Studio
Version: 1.0
*/
`;
fs.writeFileSync(path.join(themeDir, 'style.css'), styleCss);

// 2. Create functions.php
const functionsPhp = `<?php
if (!defined('ABSPATH')) exit;

function archtek_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('elementor');
}
add_action('after_setup_theme', 'archtek_theme_support');
`;
fs.writeFileSync(path.join(themeDir, 'functions.php'), functionsPhp);

// 3. Create index.php and page.php
const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const html = fs.readFileSync(indexHtmlPath, 'utf-8');
  
  // Extract JS and CSS bundle filenames
  const jsMatch = html.match(/src="\.?\/assets\/([^"]+\.js)"/);
  const cssMatch = html.match(/href="\.?\/assets\/([^"]+\.css)"/);
  
  const jsFile = jsMatch ? jsMatch[1] : '';
  const cssFile = cssMatch ? cssMatch[1] : '';

  if (!jsFile || !cssFile) {
    console.error('Could not detect JS or CSS bundles in dist/index.html');
    process.exit(1);
  }

  const templatePhp = `<?php
$is_elementor = isset($_GET['elementor-preview']) || (class_exists('\\Elementor\\Plugin') && \\Elementor\\Plugin::$instance->editor->is_edit_mode());
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
      <script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/assets/${jsFile}"></script>
      <link rel="stylesheet" crossorigin href="<?php echo get_template_directory_uri(); ?>/assets/${cssFile}">
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
`;

  fs.writeFileSync(path.join(themeDir, 'index.php'), templatePhp);
  fs.writeFileSync(path.join(themeDir, 'page.php'), templatePhp);
  console.log(`Generated index.php and page.php referencing ${jsFile} and ${cssFile}`);
} else {
  console.error("No dist/index.html found! Run 'npm run build' first.");
  process.exit(1);
}

// 4. Copy assets folder to theme
const themeAssetsDir = path.join(themeDir, 'assets');
if (fs.existsSync(themeAssetsDir)) {
  fs.rmSync(themeAssetsDir, { recursive: true, force: true });
}
if (fs.existsSync(path.join(distDir, 'assets'))) {
  fs.cpSync(path.join(distDir, 'assets'), themeAssetsDir, { recursive: true });
}

// 5. Copy images folder to theme
const themeImagesDir = path.join(themeDir, 'images');
if (fs.existsSync(themeImagesDir)) {
  fs.rmSync(themeImagesDir, { recursive: true, force: true });
}
if (fs.existsSync(path.join(distDir, 'images'))) {
  fs.cpSync(path.join(distDir, 'images'), themeImagesDir, { recursive: true });
}

console.log('WordPress Theme generated successfully in /wp-theme folder!');
