//require("dotenv").config();

var inquirer=require("inquirer");
var axios=require("axios");
if(process.argv[2]==="movie-this")
{
    var movie="";
    try
    {
       getmovieinfo(movie);
    }
catch(ex)
{
    callback(new Error('something bad happened'));
}
}

function getmovieinfo(movie)
{

for(var i=3;i<process.argv.length;i++)
{
    if(process.argv[2]==="movie-this")
    {
      movie+=process.argv[i]+" ";
    }

}

var queryurl="http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy";
    axios.get(queryurl).then(
        function(response)
        {
           console.log(queryurl);
           console.log(JSON.stringify(response.data));
           console.log("Title of the movie: "+response.data.Title);
           console.log("Year the movie came out: "+response.data.Year);
           console.log("IMDB Rating of the movie: "+response.data.Ratings[0].Value);
           console.log("Rotten Tomatoes Rating of the movie: "+response.data.Ratings[1].Value);
           console.log("Country where the movie was produced: "+response.data.Country);
           console.log("Language of the movie: "+response.data.Language);
           console.log("Plot of the movie: "+response.data.Plot);
           console.log("Actors in the movie: "+response.data.Actors);
        }
       
    );
    
    
}

