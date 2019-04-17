const express = require('express');

var app = express();

app.get('/', (request, response) => {
    response.send('welcome page');
});
app.get('/info', (request, response) => {
    response.send('my info page');
})
app.listen(8080);