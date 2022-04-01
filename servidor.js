const http = require('http');
const fs = require('fs');
const url = require('url');
const { ingresar, consultar, editar, eliminar } = require('./consultas.js')

const port = 3000;

http.createServer(async (req, res) => {

  if (req.url == '/' && req.method == 'GET') {
    res.setHeader('content-type', 'text/html');
    const html = fs.readFileSync('index.html', 'utf8');
    res.end(html);
  }

  if ((req.url == '/cancion' && req.method == 'POST')) {
    let body = "";
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      const datos = Object.values(JSON.parse(body));
      const respuesta = await ingresar(datos);
      res.end(JSON.stringify(respuesta));
    });
  }

  if (req.url == '/canciones' && req.method == 'GET') {
    const registros = await consultar();
    res.end(JSON.stringify(registros));
  }


  if (req.url == '/cancion' && req.method == 'PUT') {
    let body = "";
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      const datos = Object.values(JSON.parse(body));
      const respuesta = await editar(datos);
      res.end(JSON.stringify(respuesta));
    });
  }

  if (req.url.startsWith('/cancion') && req.method == 'DELETE') {
    const { id } = url.parse(req.url, true).query;
    const respuesta = await eliminar(id);
    res.end(JSON.stringify(respuesta));

  }

}).listen(port, () => console.log(`Servidor a la escucha en el puerto ${port}`));