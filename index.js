/**
 * Created by hansa on 8/14/2017.
 */
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useMongoClient: true }, (err) => {
    if (err) {
        console.log('Could Not Connect to Database');
    } else {
        console.log('Connected to Database: ' + config.db);
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});