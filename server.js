const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();
const getWeather = require('./handlers/weather');
const getMovies = require('./handlers/movies');
const error = require('./handlers/error');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(error);

app.get('/', (req, res) => {
  res.send('Make request on /weather to get weather data!');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
