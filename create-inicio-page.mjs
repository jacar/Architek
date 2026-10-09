import fs from 'fs';
import path from 'path';

async function createInicioPage() {
  const authHeader = 'Basic QmFja2VuZF8yMDI2OnN3eVVrdXNmRnBVNnc3RXhLbG5LQzRJUg==';
  const siteUrl = 'https://www.archtekstudio.com';

  console.log('Reading Elementor template...');
  const templatePath = path.join(process.cwd(), 'elementor-templates', 'archtek-home-completa.json');
  const templateRaw = fs.readFileSync(templatePath, 'utf-8');
  const templateObj = JSON.parse(templateRaw);

  const elementorDataString = JSON.stringify(templateObj.content);

  console.log('Sending request to WordPress REST API to create page "Inicio"...');
  
  // Custom CSS to ensure Archtek luxury aesthetics and animations work in Elementor
  const customStyles = `
<style id="archtek-custom-effects">
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

html, body {
  background-color: #0c0c0c !important;
  color: #f0ece6 !important;
  font-family: 'DM Sans', sans-serif !important;
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
}

/* Luxury Card Transitions & Hover Effects */
.elementor-column {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.elementor-column:hover {
  transform: translateY(-4px);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0c0c0c;
}
::-webkit-scrollbar-thumb {
  background: #2a2a2a;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #c9a050;
}

/* Button hover luxury pulse */
.elementor-button {
  transition: all 0.3s ease !important;
}
.elementor-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 160, 80, 0.25) !important;
}
</style>
`;

  const payload = {
    title: 'Inicio',
    slug: 'inicio',
    status: 'publish',
    template: 'elementor_canvas',
    content: customStyles,
    meta: {
      _elementor_edit_mode: 'builder',
      _elementor_template_type: 'wp-page',
      _elementor_data: elementorDataString
    }
  };

  try {
    const res = await fetch(`${siteUrl}/wp-json/wp/v2/pages`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Failed to create page:', data);
      return;
    }

    console.log(`Page "Inicio" created successfully!`);
    console.log(`ID: ${data.id}`);
    console.log(`Link: ${data.link}`);
    console.log(`Edit in Elementor: ${siteUrl}/wp-admin/post.php?post=${data.id}&action=elementor`);
  } catch (err) {
    console.error('Error:', err);
  }
}

createInicioPage();
