require("dotenv").config();

const Spotify = require("node-spotify-api");
const axios = require("axios");
const keys = require("./key.js");
const moment = require("moment");
const file = require("file-system");
const fs = require("fs");

var spotify = new Spotify(keys.spotify);

var searchType = process.argv[2];
var args = process.argv.slice(3);
var userInput = args.join(" ");
var userInputTrucated = args.join("+");
console.log(args);
console.log(userInput);
console.log(userInputTrucated);

switch (searchType) {
    case "concert-this":
        concertSearch(userInputTrucated);
        break;
    case "spotify-this-song":
        songSearch(userInput);
        break;
    case "movie-this":
        movieSearch(userInputTrucated);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}


// BANDS IN TOWN CONCERT SEARCH
// node liri.js concert-this <artist/band name here>
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:


// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

function concertSearch(userConcert) {

    // Then run a request with axios to the OMDB API with the movie specified
    var bandsInTownURL = "https://rest.bandsintown.com/artists/" + userConcert + "/events?app_id=codingbootcamp";

    axios.get(bandsInTownURL).then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("Artist: " + response.data[i].lineup);
                let dateTime = response.data[i].datetime;
                let updatedDateTime = moment(dateTime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY");
                console.log("Event date: " + updatedDateTime);
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("----------------------------------------------------------");
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


// SPOTIFY SONG SEARCH
// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

function songSearch(userSong) {
    spotify.search({
        type: "track",
        query: userSong
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
            console.log("----------------------------------------------------------");
        }
        // If no song is provided then your program will default to "The Sign" by Ace of Base.
    });
}


// OMDB MOVIE SEARCH
// node liri.js movie-this '<movie name here>'

// This will output the following information to your terminal/bash window:
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

function movieSearch(userMovie) {

    // Then run a request with axios to the OMDB API with the movie specified
    var omdbURL = "http://www.omdbapi.com/?t=" + userMovie + "&apikey=trilogy";

    axios.get(omdbURL).then(
        function (response) {
            console.log("Movie title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB rating: " + response.data.imdbRating);
            for (i = 0; i < response.data.imdbRating.length; i++) {
                if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                    // console.log(response.data.Ratings[i].Source);
                    console.log("Rotten Tomatoes rating: " + response.data.Ratings[i].Value);
                }
            }
            console.log("Country movie was produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);

            // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
            // If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
            // It's on Netflix!
        });
}



// DO WHAT LIRI SAYS
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.

function doWhatItSays() {
    // We will read the existing bank file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // console.log(data);
        data = data.split("\n");
        console.log(data);
        console.log(data.length);

        let randomIndex = Math.floor(Math.random() * data.length);
        console.log(randomIndex);

        // for (i = 0; i < data.length; i++) {
        let randomPicker = data[randomIndex].split(",");
        console.log(randomPicker);
        let randomSearchType = randomPicker[0];
        let randomSearchDescription = randomPicker[1].replace(/\"/g, "");
        let randomSearchTruncated = randomPicker[1].replace(/ /g, "+").replace(/\"/g, "");

        switch (randomSearchType) {
            case "concert-this":
                concertSearch(randomSearchTruncated);
                break;
            case "spotify-this-song":
                songSearch(randomSearchDescription);
                break;
            case "movie-this":
                movieSearch(randomSearchTruncated);
                break;
        }
        // }
    });
}


// finish up default searches
// omdb key
// errors
// comments