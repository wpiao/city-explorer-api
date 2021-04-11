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
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.get('/', (req, res) => {
  res.send('Make request on /weather to get weather data!');
});

app.get('/weather', (req, res) => {
  const data = weatherData.data.map(eachDay => new Forecast(eachDay.datetime, eachDay.weather.description));
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});