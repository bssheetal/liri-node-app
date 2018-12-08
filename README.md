Description

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Functionality

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

API's consumed

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [OMDB API](http://www.omdbapi.com) 

* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

Packages Installed

The package.json lists dependent node packages, but here's the info on which was installed

 * "axios":
  npm install axios
 * "dotenv":
  npm install dotenv
 *  "moment":
 npm install moment
 *  "node-spotify-api":
 npm install node-spotify-api

Commands to start this project running

Get Movie Info:

Retrieves movie information for a movie:

node liri.js movie-this "Star Wars"

Get Concert Info:

Retrieves concert information for an artist:

node liri.js concert-this John Legend

Get Song Info:

Retrieves song information for a track:

node liri.js spotify-this-song  "Just The Way You Are"

Demo Link:
https://drive.google.com/file/d/1FipGqYRR8pgODag7NJK4Y7aZXqzKj3mk/view
