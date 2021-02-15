const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/random-joke': jsonHandler.getRandomJokeResponse,
  notFound: htmlHandler.get404Response,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);
