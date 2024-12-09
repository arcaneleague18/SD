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
  console.log(`Request received for URL: ${req.url}`);

  if (req.url === '/osinfo') {
    console.log('Operating System Information:');
    console.log(`OS Type: ${os.type()}`);
    console.log(`Platform: ${os.platform()}`);
    console.log(`Architecture: ${os.arch()}`);
    console.log(`Uptime: ${os.uptime()} seconds`);
    console.log(`Free Memory: ${os.freemem()} bytes`);
    console.log(`Total Memory: ${os.totalmem()} bytes`);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Check the console for OS information.\n');
  } else if (req.url === '/pathinfo') {
    const filePath = '/users/sathish/documents/sample.txt';

    console.log('Path Information:');
    console.log(`Directory: ${path.dirname(filePath)}`);
    console.log(`Base: ${path.basename(filePath)}`);
    console.log(`Extension: ${path.extname(filePath)}`);
    console.log(`Absolute Path: ${path.resolve(filePath)}`);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Check the console for Path information.\n');
  } else {
    console.log('Default Request Handled.');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the Custom Node.js Server! Check the console for details.\n');
  }
});

// Start the server
const PORT = 5500;
server.listen(PORT, () => {
  myEmitter.emit('serverStart', PORT);
});
