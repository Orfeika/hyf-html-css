'use strict';

const http = require('http');
const TIMEOUT = 100;

function sendSuccess(response, state) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify({ state }));
  response.end();
}


function sendError(response) {
response.writeHead(404, { 'Content-Type': 'application/json' });
 response.write(JSON.stringify({ 'error': 'Not found' }));
 response.end();

}

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    if (request.url == '/') {
      sendSuccess(response, 'OK');

    }
    else if (request.url == '/state') {
      sendSuccess(response, state);

    } else if (request.url == '/reset') {

      sendSuccess(response, (state = 10));

    } else if (request.url == '/add') {
      sendSuccess(response, ++state);


    } else if (request.url == '/subtract') {
      sendSuccess(response, --state);

    } else {
      sendError(response);
    }

  });

  return server;
}

module.exports = {
  createServer
};
