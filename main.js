const http = require('http');
const fs = require('fs');
const path = require('path');

let commands = {};
process.argv.forEach((arg)=>{
  if(arg[0] == "-"){
    let san = arg.substring(1, arg.length).split("=");
    commands[san[0]] = san[1];
  }
});

let Server = function(){
  this.data = { Server: null, options: { host: "localhost", port: "8080" } };
  if(commands.hasOwnProperty("host")){
    this.setHost(commands.host);
  }
  if(commands.hasOwnProperty("port")){
    this.setPort(commands.port);
  }
}
Server.prototype.mimeTypes = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".wav": "audio/wav"
}
Server.prototype.setHost = function(host){
  this.data.options.host = host;
}
Server.prototype.getHost = function(){
  return this.data.options.host;
}
Server.prototype.setPort = function(port){
  this.data.options.port = port;
}
Server.prototype.getPort = function(){
  return this.data.options.port;
}
Server.prototype.getMime = function(filePath){
  let ext = path.extname(filePath);
  if(this.mimeTypes.hasOwnProperty(ext)){
    return this.mimeTypes[ext];
  }
  return "text/html";
}
Server.prototype.getFilePath = function(url){
  let filePath = '.' + url;
  if (filePath == './')
      filePath = './index.html';
  return filePath;
}
Server.prototype.start = function(){
  console.log("Starting server at " + this.data.options.host + ":" + this.data.options.port);
  http.createServer(function (request, response) {
    console.log("Handling route '" + request.url + "'.");
      let filePath = this.getFilePath(request.url);
      let contentType = this.getMime(filePath);
      fs.readFile(filePath, function(error, content) {
        if (error) {
          if(error.code == 'ENOENT'){
            fs.readFile('./404.html', function(error, content) {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            });
          }
          else {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            response.end();
          }
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
  }.bind(this)).listen(this.getPort(), this.getHost());
  console.log('Server running at '+this.getHost()+':'+this.getPort());
}
let server = new Server();
server.start();
