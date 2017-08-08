// NodeJS existing module dependencies
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var http = require('http');
var fs = require('fs');

// NodeJS project module that access a mongodb database which stores
// movie infomation
const movieTitles = require('./backend/movie_titles')();

// Create a server and listen
http.createServer(function (req, res) {
  // Respond to requests
  if (req.url === '/animation.htm') {
    type = 'text/html';
    res.writeHead(200, {'Content-Type': type});
    movieTitles.getMoviePage('animation', res);
  } else if(req.url === '/scifi.htm') {
    type = 'text/html';
    res.writeHead(200, {'Content-Type': type});
    movieTitles.getMoviePage('scifi', res);
  } else if(req.url === '/random.htm') {
    type = 'text/html';
    res.writeHead(200, {'Content-Type': type});
    movieTitles.getMoviePage('random',res);
  } else {
    // respond to all other requests except movie title pages
    var content = "";
    var type = '';
    var imageRe = /[\w-]+.jpg/;
    if(req.url === '/') {
      content = fs.readFileSync('frontend/main.html');
      type = 'text/html';
    } else if (req.url.split('.').pop().toLowerCase() == "jpg") {
      var imageFileMatch = req.url.match(imageRe);
      var imageFile = "images/" + imageFileMatch[0];
      content = fs.readFileSync(imageFile);
      type = 'image/jpeg';
    }
    res.writeHead(200, {'Content-Type': type});
    res.end(content);
  }
}).listen(9000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:9000/');
