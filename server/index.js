const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/route');

const app = express();

//Define port number
const port = 3000;

//just to test if server is runnning
//app.get('/', (req, res) => {
//    res.send('Hello World!');
//});

// connect to the database

async function getMongooseConnection() {
    try {
        await mongoose.connect('mongodb://localhost:27017/photo-sharing', { useNewUrlParser: true });
        console.log('Connection to MongoDB successful');
    } catch (error) {
        console.log('Error in MongoDb connection: ' + error);
    }
}

getMongooseConnection();

//For error handling after the connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;

//configure app to use body-parse library
app.use(bodyParser.json());

//configure routes
app.use('/api', routes);

//bind port to the server
app.listen(port, () =>{
    console.log('Server listening at localhost:' + port);
});
