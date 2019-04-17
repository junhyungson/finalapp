const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
const from_api = require('./challengeapi1.js');
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('main.hbs');
});

var result='';
var country = 'canada'
var errormessage = ''
var getWeather = async function()
{
    try{
        capitalResult =  await from_api.getcapital(country);
        weatherResult = await from_api.getWeather(capitalResult,country);
        result = `the weather in ${capitalResult}, capital of ${country} is 
        ${JSON.stringify(Weatherresult.temp)} with wind speed of ${JSON.stringify(Weatherresult.wind)}`;
    }
    catch(error) {
        result = error;
    }
}
app.get('/weather', async (request, response)=> {
    getWeather();
console.log(result);
    response.render('weather.hbs', {
        weather: result
    });
});

app.get('/info', (request, response) => {
    response.send('my info page');
});

app.get('/404', (request, response) => {
    response.send({
        error: "page not found"
        
    })
})
app.listen(port, () => {
    console.log(`server is up on the port ${port}`);
});