<?php
$is_elementor = isset($_GET['elementor-preview']) || (class_exists('\Elementor\Plugin') && \Elementor\Plugin::$instance->editor->is_edit_mode());
$theme_uri = get_template_directory_uri();
$og_image = $theme_uri . '/images/og-share.jpg';
$site_title = 'ARCHTEK STUDIO | Iluminación Arquitectónica &amp; Domótica de Lujo';
$site_desc = 'Estudio boutique especializado en diseño de iluminación arquitectónica de alto nivel y domótica residencial de lujo. Transformamos espacios a través de la luz.';
?>
<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url($theme_uri . '/images/favicon-32x32.png'); ?>" />
    <link rel="icon" type="image/png" sizes="192x192" href="<?php echo esc_url($theme_uri . '/images/simbolo-gris.png'); ?>" />
    <link rel="icon" type="image/png" href="<?php echo esc_url($theme_uri . '/images/Símbolo gris.png'); ?>" />
    <link rel="apple-touch-icon" href="<?php echo esc_url($theme_uri . '/images/apple-touch-icon.png'); ?>" />
    <link rel="shortcut icon" href="<?php echo esc_url($theme_uri . '/images/favicon.ico'); ?>" />
    <title><?php echo $site_title; ?></title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="<?php echo esc_attr($site_desc); ?>" />
    <meta name="keywords" content="iluminación arquitectónica, domótica de lujo, automatización residencial, lighting design, archtek studio, iluminación inteligente, casas inteligentes" />
    <meta name="author" content="ARCHTEK STUDIO" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="<?php echo esc_url(home_url('/')); ?>" />

    <!-- Open Graph / WhatsApp / Facebook / LinkedIn / iMessage -->
    <meta property="og:locale" content="es_ES" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ARCHTEK STUDIO" />
    <meta property="og:title" content="<?php echo esc_attr($site_title); ?>" />
    <meta property="og:description" content="<?php echo esc_attr($site_desc); ?>" />
    <meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>" />
    <meta property="og:image" content="<?php echo esc_url($og_image); ?>" />
    <meta property="og:image:secure_url" content="<?php echo esc_url($og_image); ?>" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="ARCHTEK STUDIO — Iluminación y Domótica de Lujo" />
    <meta property="og:image:type" content="image/jpeg" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo esc_attr($site_title); ?>" />
    <meta name="twitter:description" content="<?php echo esc_attr($site_desc); ?>" />
    <meta name="twitter:image" content="<?php echo esc_url($og_image); ?>" />

    <!-- Google Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "ARCHTEK STUDIO",
      "url": "https://www.archtekstudio.com/",
      "logo": "<?php echo esc_url($og_image); ?>",
      "image": "<?php echo esc_url($og_image); ?>",
      "description": "Estudio boutique especializado en diseño de iluminación arquitectónica de alto nivel y domótica residencial de lujo.",
      "telephone": "+57 318 630 6790",
      "email": "contacto@archtekstudio.com"
    }
    </script>

    <!-- Instant Inline Theme (Zero Comments to avoid scraper issues) -->
    <script>
      (function(){try{var h=new Date().getHours(),d=h>=6&&h<18,t=d?'light':'dark';document.documentElement.setAttribute('data-theme',t);document.documentElement.setAttribute('data-theme-source','auto');var s=document.documentElement.style;if(d){s.setProperty('--color-bg','#F9F9F7');s.setProperty('--color-fg','#0A0A0A');s.setProperty('--color-accent','#4A5240');s.setProperty('--color-muted-fg','#888888');s.setProperty('--color-surface','#EAEAE5');s.setProperty('--color-border','rgba(0,0,0,0.1)');}else{s.setProperty('--color-bg','#0A0A0A');s.setProperty('--color-fg','#FFFFFF');s.setProperty('--color-accent','#4A5240');s.setProperty('--color-muted-fg','#888888');s.setProperty('--color-surface','#111111');s.setProperty('--color-border','rgba(255,255,255,0.1)');}}catch(e){}})();
    </script>

    <?php if (!$is_elementor) : ?>
      <script>
        try {
          localStorage.removeItem('archtek-site-content');
          localStorage.removeItem('archtek-site-content-v1');
          localStorage.removeItem('archtek-site-content-v2');
        } catch(e) {}
        window.ARCHTEK_CAN_EDIT = <?php echo (is_user_logged_in() && current_user_can('edit_posts')) ? 'true' : 'false'; ?>;
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      </script>
      <script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/assets/index-Dca7GfUu.js?v=<?php echo filemtime(get_template_directory() . '/assets/index-Dca7GfUu.js'); ?>"></script>
      <link rel="stylesheet" crossorigin href="<?php echo get_template_directory_uri(); ?>/assets/index-Sf8QpuXy.css?v=<?php echo filemtime(get_template_directory() . '/assets/index-Sf8QpuXy.css'); ?>">
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
