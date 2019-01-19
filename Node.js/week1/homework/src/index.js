'use strict';

const {
  createServer
} = require('./server');

const TIMEOUT = 100;
const PORT = 3000;

function handleRequest(request, response) {
  let state = 10;
  if (request.url == '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("<!doctype html><html><body>'Hello!'</body></html>");

  }
  else if (request.url == 'state') {
    response.state(10);

  } else { 
    response.writeHead(404);
    response.write("404 Not found");
  }

  response.end();

}



createServer(handleRequest).listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening on http://localhost:${PORT}`);
  }

});
