/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

let messages = {
  results: []
}

exports.requestHandler = function (request, response) {
 
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json'

  if(request.url === '/classes/messages'){
    if (request.method === 'GET') {
      statusCode = 200
      response.writeHead(statusCode, headers)
      response.end(JSON.stringify(messages));
    } else if(request.method === 'OPTIONS'){
      statusCode = 200
      response.writeHead(statusCode, headers)
      response.end(headers);

    } else if (request.method === 'POST') {
      var body = '';
      request.on('data', chunk => {
        body += chunk
      }).on('end', () => {
        body = JSON.parse(body);
        messages.results.push(body);
      });
  
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messages));
    }
  } else {
    statusCode = 404
    response.writeHead(statusCode, headers);
    response.end();
  }  
  response.end()
}




// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds
}