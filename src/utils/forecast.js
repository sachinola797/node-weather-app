const request = require('request');

const forecast = (lati, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e0a7e06816ea35b6fc51bf46ba95bbab&query=${lati},${long}`;
    request({url: url, json: true}, (err, response) => {
        if (err) {
            callback(err, undefined)
            return;
        }
        if (!response?.body?.location) {
            callback('Error: Unable to weather of the given location', undefined);
            return;
        }
        const outputString = `
Address: ${response.body.location.name}, ${response.body.location.region}, ${response.body.location.country}\n
${response.body.location.localtime}\t Temp: ${response.body.current.temperature}°C\t ${response.body.current.weather_descriptions[0]}\n
Wind: ${response.body.current.wind_speed} km/hr ${response.body.current.wind_degree}°${response.body.current.wind_dir}
            `;
        callback(undefined, outputString);
    })
}

module.exports = forecast;