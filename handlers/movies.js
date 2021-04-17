const superagent = require('superagent');

const getMovies = (req, res) => {
  superagent.get(`${process.env.MOVIE_URI}/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.location}`)
    .then(res => res.body.results)
    .then(movies => movies.map(movie => new Movie(movie)))
    .then(result => res.send(result));
};

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `${process.env.MOVIE_IMG_PREFIX_URI}${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
}

module.exports = getMovies;