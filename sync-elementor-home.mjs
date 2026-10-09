import fs from 'fs';
import path from 'path';

async function syncHome() {
  const authHeader = 'Basic QmFja2VuZF8yMDI2OnN3eVVrdXNmRnBVNnc3RXhLbG5LQzRJUg==';
  const siteUrl = 'https://www.archtekstudio.com';

  const templatePath = path.join(process.cwd(), 'elementor-templates', 'archtek-home-completa.json');
  const templateRaw = fs.readFileSync(templatePath, 'utf-8');
  const templateObj = JSON.parse(templateRaw);
  const elementorDataString = JSON.stringify(templateObj.content);

  console.log("Updating Page 101 (Inicio) with Elementor data...");
  const updateRes101 = await fetch(`${siteUrl}/wp-json/wp/v2/pages/101`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      template: 'default',
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_data: elementorDataString
      }
    })
  });
  const data101 = await updateRes101.json();
  console.log("Page 101 updated:", data101.id, data101.title?.raw);

  console.log("Setting Page 101 as front page in WP settings...");
  const settingsRes = await fetch(`${siteUrl}/wp-json/wp/v2/settings`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      show_on_front: 'page',
      page_on_front: 101
    })
  });
  const settingsData = await settingsRes.json();
  console.log("Updated settings front page:", settingsData.page_on_front);

  // Also update Page 9 (Home) just in case
  await fetch(`${siteUrl}/wp-json/wp/v2/pages/9`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      template: 'default',
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_data: elementorDataString
      }
    })
  });
  console.log("Page 9 also synchronized with Elementor builder data.");
}

syncHome();
