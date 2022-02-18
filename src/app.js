const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3001;

const app = express();

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public/index.html');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        desc: 'Weather App',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        desc: 'About Us',
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({err: 'Please provide the address'});
    }

    geocode(req.query.address, (err, {long, lati} = {}) => {
        if (err) {
            return res.send({err: err});
        }
        forecast(lati, long, (forecastError, response) => {
            if (forecastError) {
                return res.send({err: forecastError});
            }
            return res.send({result: response});
        })
    })


    
})

app.get('/help', (req, res) => {
    res.send({
        name: "Sachin",
        age: 24
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather App',
        desc: '404 Page',
        errorMessage: '404: Page not found',
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})
