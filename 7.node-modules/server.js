const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Create and trigger an event
myEmitter.on('serverStart', (port) => {
  console.log(`Server successfully started on port ${port}`);
});

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/osinfo') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        osType: os.type(),
        platform: os.platform(),
        arch: os.arch(),
        uptime: os.uptime(),
      })
    );
  } else if (req.url === '/pathinfo') {
    const filePath = '/users/sathish/documents/sample.txt';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        directory: path.dirname(filePath),
        base: path.basename(filePath),
        extension: path.extname(filePath),
        absolutePath: path.resolve(filePath),
      })
    );
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the Custom Node.js Server!');
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  myEmitter.emit('serverStart', PORT);
});
