const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
const from_api = require('./challengeapi1.js');
var app = express();
const request = require('request');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('main.hbs', {
        image: result
    }
    );
});
var result='';
var country = 'mars'
var getcapital = ((country) => {
    return new Promise((resolve, reject) =>{
        request({
            // // https://restcountries.eu/rest/v2/name/canada?fullText=true
            // url: `https://restcountries.eu/rest/v2/name/` + encodeURIComponent(country) + `?fullText=true`,
            url: `https://images-api.nasa.gov/search?q=${country}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject(error);
            }
            else if (body.status == '404')
            {
                reject(body.message);
            }
            else
            {
            resolve(body.collection.items[0].links[0]);
            console.log(body.collection.items[0].links[0].href);
            }
        });
    });
});

num = 5
var getcards = ((nm) => {
    return new Promise((resolve, reject) =>{
        request({
            // // https://restcountries.eu/rest/v2/name/canada?fullText=true
            // url: `https://restcountries.eu/rest/v2/name/` + encodeURIComponent(country) + `?fullText=true`,
            url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${num}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject(error);
            }
            else if (body.status == '404')
            {
                reject(body.message);
            }
            else
            {
            resolve(body.collection.items[0].links[0]);
            }
        });
    });
});

getcapital(country).then((nasaresult)=>{
    result = nasaresult;
}).catch((error)=>{
    result = error;
})


app.get('/weather', (request, response)=> {
    response.render('weather.hbs', {
    });
})
// var getWeather = ((city, country) => {
//     return new Promise((resolve, reject) => {
//         request({
//             // https://api.openweathermap.org/data/2.5/weather?q=ottawa,canada&appid=2264e3b73dc094131aeb3adfa3d71b61
//             url: `https://api.openweathermap.org/data/2.5/weather?q=`+ encodeURIComponent(city) +',' + encodeURIComponent(country) + `&appid=2264e3b73dc094131aeb3adfa3d71b61`,
//             json:true
//         }, (error, response, body) => {
//             resolve({
//                 temp: body.main.temp,
//                 wind: body.wind.speed
//             });
//         });
//     });
// });
// getcapital(country).then((capital) =>{
//     getWeather(capital, country).then((weather) =>{
//         result = `the weather in ${capital}, capital of ${country} is 
//         ${JSON.stringify(weather.temp)} with wind speed of ${JSON.stringify(weather.wind)}`;
//     })
// }).catch((error) =>{
//     result = error;
// })

;

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