const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

function Forecast(day) {
  this.date = day.datetime;
  this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
}

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `${process.env.MOVIE_IMG_PREFIX_URI}${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
}

app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.get('/', (req, res) => {
  res.send('Make request on /weather to get weather data!');
});

app.get('/weather', (req, res) => {
  superagent.get(`${process.env.WEATHERBIT_FORECAST_URI}/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}`)
    .then(res => res.body.data)
    .then(data => data.map(dailyWeather => new Forecast(dailyWeather)))
    .then(result => res.send(result));
});

app.get('/movies', (req, res) => {
  superagent.get(`${process.env.MOVIE_URI}/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.location}`)
    .then(res => res.body.results)
    .then(movies => movies.map(movie => new Movie(movie)))
    .then(result => res.send(result));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});