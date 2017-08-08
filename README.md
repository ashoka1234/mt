# Movie-trailer

Movie-trailer is a web app that allows movie trailer playback when a movie poster image is clicked. The movie poster images are shown on the web site.

Install
-------
The frontend functionality is coded in `frontend\main.html` using `HTML, javascript` and `AngularJS`.

The backend functionality is coded in the `NodeJS` server javascript file `movie_trailer_server.js` located in the project directory and a `NodeJS` module `backend\movie_titles.js`. The backend uses `NodeJS` and `MongoDB` for database storage.

The image assets are located in `images` project subdirectory.


Run
---
On the project directory run

`node movie_trailer_server.js`

For basic insertions to database and cleanup, on project directory run

`node movie_database.js`
