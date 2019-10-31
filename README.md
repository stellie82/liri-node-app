# LIRI Bot

LIRI is a Language Interpretation and Recognition Interface.  The LIRI bot app runs as a command line node app and uses input parameters to output information for any _one_ of the following commands:
* concert-this  `node liri.js concert-this <artist/band name here>`
  * Name of the venue
  * Venue location
  * Date of the Event (use moment to format this as "MM/DD/YYYY")
  ![concert-this](https://github.com/stellie82/liri-node-app/screenshots/concert-this.png)
  
* spotify-this-song  `node liri.js spotify-this-song '<song name here>'`
  * Artist(s)
  * The song's name
  * A preview link of the song from Spotify
  * The album that the song is from
  * _If no song is provided then your program will default to "The Sign" by Ace of Base._
  ![spotify-this-song](https://github.com/stellie82/liri-node-app/screenshots/spotify-this-song.png)
  
* movie-this  `node liri.js movie-this '<movie name here>'`
  * Title of the movie
  * Year the movie came out
  * IMDB Rating of the movie
  * Rotten Tomatoes Rating of the movie  
  * Country where the movie was produced
  * Language of the movie
  * Plot of the movie
  * Actors in the movie
  * _If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'_
  ![movie-this](https://github.com/stellie82/liri-node-app/screenshots/movie-this.png)
  
* do-what-it-says  `node liri.js do-what-it-says`
  * Print results for a randomly chosen artist in the random.txt file
  ![random text file](https://github.com/stellie82/liri-node-app/screenshots/random.png)
  
## Code and Results

A Switch statement is used to obtain the user's CLI.  LIRI then runs the specific block of code to output the relevant information back to the user.
![switch statement](https://github.com/stellie82/liri-node-app/screenshots/switch.png)

### Concert Search
![concert-this](https://github.com/stellie82/liri-node-app/screenshots/concertSearch.png)
![concert-this](https://github.com/stellie82/liri-node-app/screenshots/concert-this-results.png)

### Song Search
![spotify-this-song](https://github.com/stellie82/liri-node-app/screenshots/songSearch.png)
![spotify-this-song](https://github.com/stellie82/liri-node-app/screenshots/spotify-this-song-results.png)

### Movie Search
![movie-this](https://github.com/stellie82/liri-node-app/screenshots/movieSearch.png)
![movie-this](https://github.com/stellie82/liri-node-app/screenshots/movie-this-results.png)

### Random Search
![do-what-it-says](https://github.com/stellie82/liri-node-app/screenshots/doWhatItSays.png)
![do-what-it-says](https://github.com/stellie82/liri-node-app/screenshots/do-what-it-says.png)

## Required Files

LIRI requires installation of several Node packages and links to local files, including:
* axios
* dotenv
* Node Spotify API

![files](https://github.com/stellie82/liri-node-app/screenshots/files.png)

## Logging

User input is also logged to the log.txt file to capture each search type and description of the user.
![logging](https://github.com/stellie82/liri-node-app/screenshots/logging.png)

## Technologies Used
* Javascript
* Moment.js
* Node (axios)
  * Spotify API
  * OMDB API
  * Bands in Town API
