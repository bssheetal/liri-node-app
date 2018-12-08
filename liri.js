require("dotenv").config();
var axios = require("axios");
var inquirer = require("inquirer");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var whattodo = process.argv[2];
var searchinfo = process.argv[3];
doAsIsay(whattodo, searchinfo);
function doAsIsay(whattodo, searchinfo) {
    if (whattodo === "movie-this") {
        var searchinfo = "";
        getmovieinfo(searchinfo);

    }

    if (whattodo === "concert-this") {
        var searchinfo = "";
        getconcertinfo(searchinfo);
    }

    if (whattodo === "spotify-this-song") {

        if (!searchinfo) {
            getspecificsonginfo();
        }

        else
            getsonginfo(searchinfo);
    }

    if (whattodo === "do-what-it-says") {

        getrandominfo();
    }

}
function getmovieinfo(searchinfo) {

    for (var i = 3; i < process.argv.length; i++) {

        searchinfo += process.argv[i] + " ";
    }

    if (!searchinfo)
        (
            searchinfo = "Mr.Nobody"
        )

    var queryurl = "http://www.omdbapi.com/?t=" + searchinfo + "&y=&plot=short&apikey=trilogy";
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

function getconcertinfo(searchinfo) {

    for (var i = 3; i < process.argv.length; i++) {
        searchinfo += process.argv[i];
    }
    var queryurl = "https://rest.bandsintown.com/artists/" + searchinfo + "/events?app_id=codingbootcamp";

    axios.get(queryurl).then(function (response, err) {
        if (err) {
            return console.log("Enter valid artist name");
        }
        else {
            console.log("Upcoming concerts for:" + searchinfo + ":")
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.city + "," + response.data[i].venue.region + " " + "at" + " " + response.data[i].venue.name + " " + moment(response.data[i].datetime).format('L'));

            }
        }
    });




}

function getspecificsonginfo() {


    spotify.search(
        {

            type: 'track',
            query: "California Girls"
        }, function (err, response) {

            var artists = response.tracks.items[0].artists;
            var artistnames = [];

            for (var i = 0; i < artists.length; i++) {

                artistnames.push(artists[i].name);
            }

            var artists = "Artists :" + artistnames.join(",") + "\n";
            var songname = "Name of the song:" + response.tracks.items[0].name + "\n";
            var previewlink = "Preview link of song:" + response.tracks.items[0].preview_url + "\n";
            var albumname = "Album name:" + response.tracks.items[0].album.name + "\n";
            var divider = "------------------------------------------------------------------" + "\n";
            fs.appendFileSync("log.txt", artists + songname + previewlink + albumname + divider);
            //console.log("Artists:" + artists);
        });




}

function getsonginfo(searchinfo) {

    spotify.search(
        {

            type: 'track',
            query: searchinfo
        }, function (err, response) {

            var artists = response.tracks.items[0].artists;
            var artistnames = [];

            for (var i = 0; i < artists.length; i++) {

                artistnames.push(artists[i].name);
            }

            var artists = "Artists :" + artistnames.join(",") + "\n";
            var songname = "Name of the song:" + response.tracks.items[0].name + "\n";
            var previewlink = "Preview link of song:" + response.tracks.items[0].preview_url + "\n";
            var albumname = "Album name:" + response.tracks.items[0].album.name + "\n";
            var divider = "------------------------------------------------------------------" + "\n";
            fs.appendFileSync("log.txt", artists + songname + previewlink + albumname + divider);
            //console.log("Artists:" + artists);
        });



}
function getrandominfo() {
    fs.readFile("random.text", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        whattodo = dataArr[0];
        searchinfo = dataArr[1];
        console.log("Hurray!Check the log file for results");
        doAsIsay(whattodo, searchinfo);
    });
}