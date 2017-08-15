/**
 * Created by hansa on 8/14/2017.
 */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useMongoClient: true }, (err) => {
    if (err) {
        console.log('Could Not Connect to Database');
    } else {
        console.log('Connected to Database: ' + config.db);
    }
});

app.use(express.static(__dirname + '/client/dist/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});