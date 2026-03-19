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

  // Se a URL termina com /, procura index.html dentro da pasta
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  // Se a URL não tem extensão, pode ser um diretório — tenta /index.html
  const ext = path.extname(urlPath).toLowerCase();
  if (!ext) {
    const dirIndex = path.join(ROOT, urlPath, 'index.html');
    if (fs.existsSync(dirIndex)) {
      res.writeHead(302, { 'Location': urlPath + '/' });
      res.end();
      return;
    }
  }

  const filePath = path.join(ROOT, urlPath);
  const mimeType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 — Página não encontrada</h1><p><a href="/">Voltar ao início</a></p>');
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
  console.log(`   Acesse: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`   Landing Page: \x1b[36mhttp://localhost:${PORT}/landing/\x1b[0m\n`);
  console.log('   Pressione Ctrl+C para encerrar.\n');
});
