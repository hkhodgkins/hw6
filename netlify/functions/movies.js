// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    for (let i=0; i < moviesFromCsv.length; i++) {
      // store movies in memory
      let movie = moviesFromCsv[i]
      // require developor to pass two querystring parameters and filter for these parameters: year "startYear" and genre "genre"
      if (movie.startYear == year && movie.genres.includes(genre) && movie.runtimeMinutes != `\\N` && movie.genres != `\\N`) {
        movie = {
          title: movie.primaryTitle,
          year: movie.startYear,
          genres: movie.genres
        }
        // add movie to list of results
        returnValue.movies.push(movie)
      }
    }

    // measure length of array to be captured by "numResults"
    returnValue.numresults = returnValue.movies.length
    
    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Hello from the back-end!` // a string of data
    }
  }
}