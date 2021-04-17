const superagent = require('superagent');

const getWeather = (req, res) => {
  superagent.get(`${process.env.WEATHERBIT_FORECAST_URI}/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}`)
    .then(res => res.body.data)
    .then(data => data.map(dailyWeather => new Forecast(dailyWeather)))
    .then(result => res.send(result));
};

function Forecast(day) {
  this.date = day.datetime;
  this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
}

module.exports = getWeather;