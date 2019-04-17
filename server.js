const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
var app = express();

app.get('/', (request, response) => {
    response.send('welcome page');
});
app.get('/info', (request, response) => {
    response.send('my info page');
})
app.listen(port, () => {
    console.log(`server is up on the port ${port}`);
});