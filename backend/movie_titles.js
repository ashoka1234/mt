
// HTML Templates
// A single movie entry html template
var HTMLMovie = '<div class="col-md-6 col-lg-4 movie-tile text-center" data-trailer-youtube-id="%trailer_youtube_id%" data-toggle="modal" data-target="#trailer"><img src="%poster_image_url%" width="220" height="342"><h2>%movie_title%</h2></div>';

var Movie = function(title, movie_poster_image_url, movie_trailer_youtube_url) {
  var obj = Object.create(Movie.prototype);
  obj.title = title;
  obj.movie_poster_image_url = movie_poster_image_url;
  obj.movie_trailer_youtube_url = movie_trailer_youtube_url;
  return obj;
}

Movie.prototype.getFormattedMovie = function() {
  var formattedMovie = HTMLMovie.replace("%movie_title%", this.title);
  formattedMovie = formattedMovie.replace("%poster_image_url%", this.movie_poster_image_url);
  // get youtube id from url
  var re = /(?:v=)[^&#]+/;
  var youtube_url = this.movie_trailer_youtube_url;
  var youtube_id_match = youtube_url.match(re);
  youtube_id_match = youtube_id_match[0].replace(/^v=/,"");
  var movie_trailer_youtube_id = youtube_id_match;
  
  formattedMovie = formattedMovie.replace("%trailer_youtube_id%", movie_trailer_youtube_id);
  return formattedMovie;
}

var movieTitles = {
  "list" : [ Movie("emoji movie", "images/Emoji-movie-poster.jpg", "https://www.youtube.com/watch?v=o_nfdzMhmrA"),
             Movie("The Lion King", "images/Lion-king-poster.jpg", "https://www.youtube.com/watch?v=4sj1MT05lAA"),
             Movie("Popeye", "images/Popeye-poster.jpg", "https://www.youtube.com/watch?v=i4tNuM9XttM"),
             Movie("Rango", "images/Rango-poster.jpg", "https://www.youtube.com/watch?v=rHm5-av1Uks")
  ]
};

exports.getAnimationPage = function() {
  var HTMLTitles = "";
  movieTitles.list.forEach(function(movie){
    HTMLTitles = HTMLTitles + movie.getFormattedMovie();
  });
  return HTMLTitles;
}
