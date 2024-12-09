const http= require("http");
const server = http.createServer((req,res) => {
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.write("welcome to custom server");
  res.end();
});

server.listen(3000,()=>{
  console.log("server is running at http://localhost:3000");
});