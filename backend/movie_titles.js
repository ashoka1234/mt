// NodeJS module dependencies
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var events = require('events');

// module exports needed to be executed everytime itis called
// and therefore we pass functions as exports
module.exports = function() {
  // HTMLTitles object hold HTML of the movie page
  var HTMLTitles = "";
  // URL to mongodb database that hold movie information
  var dburl = 'mongodb://localhost:27017/movie_titles';
  // A single movie entry html template
  var HTMLMovie = '<div class="col-md-6 col-lg-4 movie-tile text-center" data-trailer-youtube-id="%trailer_youtube_id%" data-toggle="modal" data-target="#trailer"><img src="%poster_image_url%" width="220" height="342"><h2>%movie_title%</h2></div>';

  // A function that formats a single movie entry
  var formatMovie = function(movie) {
    var formattedMovie = HTMLMovie.replace("%movie_title%", movie.title);
    formattedMovie = formattedMovie.replace("%poster_image_url%", movie.movie_poster_image_url);
    // get youtube id from url
    var re = /(?:v=)[^&#]+/;
    var youtube_url = movie.movie_trailer_youtube_url;
    var youtube_id_match = youtube_url.match(re);
    youtube_id_match = youtube_id_match[0].replace(/^v=/,"");
    var movie_trailer_youtube_id = youtube_id_match;
    formattedMovie = formattedMovie.replace("%trailer_youtube_id%", movie_trailer_youtube_id);
    return formattedMovie;
  }

  // a function that connects to the mongodb collection and once query results
  // are received format the movie page and indicate that results are ready
  // via callback
  var getTitles = function(db, mgenre, callback) {
    // Get the collection
    var col = db.collection('movies');
    // If genre is random we send animation movies for time being
    if (mgenre === 'random') {
      mgenre = "animation";
    };
    // Find movies of particular genre
    col.find({movie_genre : mgenre}).limit(2).toArray(function(err, docs) {
      // if err stop here
      assert.equal(null, err);
      // initialise HTMLTitles
      HTMLTitles = "";
      // construct HTML movie page
      for (i=0; i < docs.length; i++) {
        HTMLTitles = HTMLTitles + formatMovie(docs[i]);
      }
      // movie page is ready and therefore call callback
      callback(HTMLTitles);
    });
  }

  return {
    getMoviePage : function(movie_genre, res) {
      // Use connect method to connect to the mongodb server
      MongoClient.connect(dburl, {native_parser:true}, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to database server");
        // database is connected and now ready to construct HTML movie page
        // once result is ready HTTP response is finalised and sent in callback
        getTitles(db, movie_genre, function(result) {
          res.end(result);
        });
      });
    }
  }
}
