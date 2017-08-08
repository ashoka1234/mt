var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var dburl = 'mongodb://localhost:27017/movie_titles';
// Use connect method to connect to the server
MongoClient.connect(dburl, function(err, db) {
  // if database failed to connect stop here
  assert.equal(null, err);
  console.log("Connected successfully to server");

  // Lets do some clean up tasks of the database
  db.collection('movies').deleteMany({movie_genre:"animation"}, function(err, r) {
    assert.equal(null, err);
  });

  // Add entries
  db.collection('movies').insertOne({
    "title" : "emoji movie",
    "movie_genre" : "animation",
    "movie_poster_image_url" : "images/Emoji-movie-poster.jpg",
    "movie_trailer_youtube_url" : "https://www.youtube.com/watch?v=o_nfdzMhmrA"
    }, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
  });
  db.collection('movies').insertOne({
    "title" : "The Lion King",
    "movie_genre" : "animation",
    "movie_poster_image_url" : "images/Lion-king-poster.jpg",
    "movie_trailer_youtube_url" : "https://www.youtube.com/watch?v=4sj1MT05lAA"
    }, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
  });
  db.collection('movies').insertOne({
    "title" : "The Matrix",
    "movie_genre" : "scifi",
    "movie_poster_image_url" : "images/The-Matrix-poster.jpg",
    "movie_trailer_youtube_url" : "https://www.youtube.com/watch?v=vKQi3bBA1y8"
    }, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
  });
  db.collection('movies').insertOne({
    "title" : "Star Wars: The Last Jedi",
    "movie_genre" : "scifi",
    "movie_poster_image_url" : "images/star-wars-last-jedi.jpg",
    "movie_trailer_youtube_url" : "https://www.youtube.com/watch?v=zB4I68XVPzQ"
    }, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
  });
  // All finish and close the db
  db.close();
});
