
var http = require('http');
var fs = require('fs');
const movieTitles = require('./backend/movie_titles');

http.createServer(function (req, res) {

  var content = '';
  var type = '';
  var imageRe = /[\w-]+.jpg/;
  if(req.url === '/') {
    content = fs.readFileSync('frontend/main.html');
    type = 'text/html';
  } else if(req.url === '/animation.htm') {
    content = movieTitles.getAnimationPage();
    type = 'text/html';
  } else if(req.url === '/scifi.htm') {
    content = movieTitles.getAnimationPage();
    type = 'text/html';
  } else if(req.url === '/random.htm') {
    content = movieTitles.getAnimationPage();
    type = 'text/html';
  } else if (req.url.split('.').pop().toLowerCase() == "jpg") {
    var imageFileMatch = req.url.match(imageRe);
    var imageFile = "images/" + imageFileMatch[0];
    content = fs.readFileSync(imageFile);
    type = 'image/jpeg';
  }
  res.writeHead(200, {'Content-Type': type});
  res.end(content);
}).listen(9000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:9000/');
