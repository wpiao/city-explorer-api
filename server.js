const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weatherData = require('./data/weather.json');

const app = express();
const PORT = process.env.PORT || 3001;

function Forecast(date, description) {
  this.date = date;
  this.description = description;
}

app.use(cors());

app.get('/', (req, res) => {
  res.send('Make request on /weather to get weather data!');
});

app.get('/weather', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});