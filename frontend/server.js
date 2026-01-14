import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = join(__dirname, 'dist');
const indexPath = join(distPath, 'index.html');

// Serve static files (CSS, JS, images, etc.) from dist directory
app.use(express.static(distPath, {
  // Don't redirect, just serve files
  redirect: false
}));

// Handle client-side routing - serve index.html for all routes
// This must be last, after static file serving
app.get('*', (req, res) => {
  try {
    if (existsSync(indexPath)) {
      const indexHtml = readFileSync(indexPath, 'utf-8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(indexHtml);
    } else {
      console.error('ERROR: index.html not found at:', indexPath);
      res.status(500).send(`
        <h1>Build Error</h1>
        <p>index.html not found. The application may not have been built correctly.</p>
        <p>Expected path: ${indexPath}</p>
      `);
    }
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send(`
      <h1>Server Error</h1>
      <p>Error loading application: ${error.message}</p>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Frontend server running on port ${PORT}`);
  console.log(`📁 Serving from: ${distPath}`);
  if (existsSync(indexPath)) {
    console.log('✅ index.html found - ready to serve');
  } else {
    console.error('❌ index.html NOT found - build may have failed');
  }
});
