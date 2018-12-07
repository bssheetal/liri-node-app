require("dotenv").config();
var axios = require("axios");
var inquirer = require("inquirer");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys=require("./keys.js");
// var spotify = new Spotify({
//     id: "cefe261bb27d42109bcc1701f4ddd236",
//     secret: "7482b81937724aa98b91a59cde8faed1"
//   });
var spotify = new Spotify(keys.spotify);
if (process.argv[2] === "movie-this") {
    var movie = "";
    getmovieinfo();

}

if (process.argv[2] === "concert-this") {
    var artist = "";
    getconcertinfo();
}

if(process.argv[2]==="spotify-this-song")
{
    
  getsonginfo();
}
function getmovieinfo() {

    for (var i = 3; i < process.argv.length; i++) {

        movie += process.argv[i] + " ";
    }

    if (!movie)
        (
            movie = "Mr.Nobody"
        )

    var queryurl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryurl).then(
        function (response) {
            if (response.data.Error) {
                return console.log("Enter valid movie name");
            }
            console.log(queryurl);
            console.log(JSON.stringify(response.data));
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Year);
            console.log("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);
        }

    )
};

function getconcertinfo() {

    for (var i = 3; i < process.argv.length; i++) {
        artist += process.argv[i];
    }
    var queryurl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryurl).then(function (response) {
        if (response.data.Error) {
            return console.log("Enter valid movie name");
        }
              
        console.log("Upcoming concerts for:" + artist + ":")
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].venue.city + "," + response.data[i].venue.region + " " + "at" + " " + response.data[i].venue.name + " " + moment(response.data[i].datetime).format('L'));

        }
    });

}

function getsonginfo()
{
   spotify.search({
       type:'track',
       query:'All the Small Things'
    })
       .then(function(response)
   {
      console.log(response.tracks.items[0].album.artists[0]);
      

   });
   

}