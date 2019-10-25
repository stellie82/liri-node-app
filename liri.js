require("dotenv").config();

var Spotify = require("node-spotify-api");
var Axios = require("axios");
var keys = require("./key.js");

var spotify = new Spotify(keys.spotify);

var searchType = process.argv[2];
var args = process.argv.slice(3);
var searchDescription = args.join(" ");

// var searchDescription = "";

// for (var i = 3; i < nodeArgs.length; i++) {
//   if (i > 3 && i < nodeArgs.length) {
//     searchDescription = searchDescription + "+" + nodeArgs[i];
//   } else {
//     searchDescription += nodeArgs[i];
//   }
// }

// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

// switch (searchType) {
//     case "concert-this":
//         spotify(searchDescription);
//         break;
//     case "spotify-this-song":
//         spotify;
//         break;
//     case "movie-this":
//         spotify(searchDescription);
//         break;
//     case "do-what-it-says":
//         spotify(searchDescription);
//         break;
// }

// function spotify() {
    spotify.search({
        type: "track",
        query: searchDescription
    }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        
        for (i = 0; i < data.tracks.items.length; i++) {
            for (j = 0; j < data.tracks.items[i].artists.length; j++) {
                console.log("Artists: " + data.tracks.items[i].artists[j].name);
            }
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Spotify preview link: " + data.tracks.items[i].preview_url);
            console.log("Album: " + data.tracks.items[i].album.name);
        }
    });
// }