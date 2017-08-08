// NodeJS existing module dependencies
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var http = require('http');
var fs = require('fs');

// NodeJS project module that access a mongodb database which stores
// movie infomation
const movieTitles = require('./backend/movie_titles');

// Create a server
// Respond to requests and listen
http.createServer(function (req, res) {
  // Initialise the HTML content
  var content = "";
  // Initialise the response type
  var type = '';
  // regular expression to extract a image file name from a string
  var imageRe = /[\w-]+.jpg/;

  // Process responses
  if(req.url === '/') {
    // This is the index HTML file
    content = fs.readFileSync('frontend/main.html');
    type = 'text/html';
    res.writeHead(200, {'Content-Type': type});
    res.end(content);
  } else if (req.url.split('.').pop().toLowerCase() == "jpg") {
    // Process image file requests
    var imageFileMatch = req.url.match(imageRe);
    var imageFile = "images/" + imageFileMatch[0];
    content = fs.readFileSync(imageFile);
    type = 'image/jpeg';
    res.writeHead(200, {'Content-Type': type});
    res.end(content);
  } else {
    // Process movie page requests

    // Just needed a dummy Promise object initially!
    var moviePageDonePromise = new Promise((resolve,reject) => {});

    // Get a promise to movie title page and work out response type
    if (req.url === '/animation.htm') {
      type = 'text/html';
      moviePageDonePromise = movieTitles.getMoviePage('animation');
    } else if(req.url === '/scifi.htm') {
      type = 'text/html';
      moviePageDonePromise = movieTitles.getMoviePage('scifi');
    } else if(req.url === '/random.htm') {
      type = 'text/html';
      moviePageDonePromise = movieTitles.getMoviePage('random');
    }
    
    moviePageDonePromise.then(function(content) {
      // Complete the response when promise to title page is fulfilled
      res.writeHead(200, {'Content-Type': type});
      res.end(content);
    }).catch(function(err) {
      console.log("Movie page access error occured");
    });
  }
}).listen(9000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:9000/');
