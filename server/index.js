const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/route');

const app = express();

//Define port number
const port = 3000;

//configure app to use body-parse library
app.use(bodyParser.json());

//configure routes
app.use('/api', routes);

//bind port to the server
app.listen(port, () =>{
    console.log('Server listening at localhost:' + port);
});
