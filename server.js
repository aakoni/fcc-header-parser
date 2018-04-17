const http = require('http');
const fs = require('fs');

let server = http.createServer((request, response) => {
  if(request.url === "/") {
    fs.readFile("./index.html", "UTF-8", (error, html) => {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(html);
    });
  } else if (request.url === "/api") {
    let lang = request.headers['accept-language'].split(";")[0];
    let userAgent = request.headers['user-agent'];
    let ip = request.headers["x-forwarded-for"] || request.connection.remoteAddress;
    response.writeHead(200, {"Content-Type": "text/plain"});

    let responseObject = {
      ipaddress: ip,
      "language": lang,
      "software": userAgent
    };
    response.end(JSON.stringify(responseObject));
  } else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end("404 - File not found");
  }
});

let portNumber = 3000;
if(!isNaN(process.env.PORT)) {
  server.listen(process.env.PORT, () => {
    console.log('Express started on http://localhost:' + process.env.PORT + '; press Ctrl-C to terminate');
  });
} else {
  server.listen(portNumber, () => {
    console.log('Express started on http://localhost:' + portNumber + '; press Ctrl-C to terminate');
  });
}