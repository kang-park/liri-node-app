require("dotenv").config();

// Node packages and Spotify API
const keys = require("./keys.js");
const request = require("request");
const moment = require("moment");
const Spotify = require('node-spotify-api');
const fs = require('fs');
let spotify = new Spotify(keys.spotify);

// Input arguments
let command = process.argv[2];
let input = process.argv[3];

// Switch Case
switch(command) {
    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
};

// When the command is "spotify-this-song", run this function
function spotifySong(){
    spotify.search({ type: 'track', query: input, limit: 1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("\n* * * * * * * * * * * * * * * * * * " +
            "\nArtist: " + data.tracks.items[0].artists[0].name +
            "\nSong's Name: " + data.tracks.items[0].name +
            "\nPreview Link of the Song: " + data.tracks.items[0].preview_url +
            "\nAlbum the Song is From: " + data.tracks.items[0].album.name +
            "\n* * * * * * * * * * * * * * * * * * ") ;

    });

};

// When the command is "movie-this", run this function
function movieThis(){

    if(!title){
        title = "Mr.Nobody";
    };

    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200){

            let json = JSON.parse(body)

            console.log("\n* * * * * * * * * * * * * * * * * * " +
            "\nTitle of the Movie: " + json.Title +
            "\nYear: " + json.Year +
            "\nIMBD Rating: " + json.imdbRating +
            "\nRotten Tomatoes Rating: " + json.Ratings[1] +
            "\nCountry: " + json.Country +
            "\nLanguage: " + json.Language +
            "\nPlot: " + json.Plot +
            "\nActors: " + json.Actors +
            "\n* * * * * * * * * * * * * * * * * * ");
        };
    });
};


//When the command is "concert-this", run this function (this is not working)
function concertThis(){
    request("https//rest.bandsintown.com/artists" + input + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200){

            let json = JSON.parse(body)
            let time = moment(bands[i].datetime).format('MM/DD/YYYY, h:mm:ss a')
            
            console.log("\n* * * * * * * * * * * * * * * * * * " +
            "\nBand: " + json[i]+
            "\nName of Venue: " + json[i].venue.name +
            "\nVenue Location: " + json[i].venue.city +
            "\nDate of the Event: " + time + 
            "\n* * * * * * * * * * * * * * * * * * ");
        };
    });
};

function doIt(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        } 

        let outArr = data.split(",");
        for (let i=0; i < outArr.length; i++){
            console.log(outArr[i]);
        };
    });
};





