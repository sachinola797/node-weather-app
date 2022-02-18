const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FjaGlub2xhNzk3IiwiYSI6ImNrem96M2xrMjA3MDMyb2xnbmIxNjdnd24ifQ.Ac-POCVx8FRaxlD3_O0UjA&limit=1`;
    request({url: url, json: true}, (err, response) => {
        if (err) {
            callback(err, undefined);
            return;
        }
        if (!response?.body?.features[0]?.center) {
            callback('Unable to fetch the location', undefined);
            return;
        }
        callback(undefined, {long: response.body.features[0].center[0], lati: response.body.features[0].center[1]});
    })
}

module.exports = geocode;