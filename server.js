// =============================================================
//  Servidor HTTP local para o site B2B Coffee Insights
//  Uso: node server.js
//  Acesse: http://localhost:3000
// =============================================================

const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// Mapa de extensões → MIME types
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.webp': 'image/webp',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

const server = http.createServer((req, res) => {
  // Remove query string e normaliza o path
  let urlPath = req.url.split('?')[0];

  // Redireciona / para index.html
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext      = path.extname(filePath).toLowerCase();
  const mimeType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // 404 — tenta servir index.html (SPA fallback)
        fs.readFile(path.join(ROOT, 'index.html'), (e2, html) => {
          if (e2) {
            res.writeHead(500);
            res.end('Erro interno do servidor.');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Erro interno: ' + err.message);
      }
      return;
    }

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('\n☕  B2B Coffee Insights — Servidor local iniciado!');
  console.log(`   Acesse: \x1b[36mhttp://localhost:${PORT}\x1b[0m\n`);
  console.log('   Pressione Ctrl+C para encerrar.\n');
});
