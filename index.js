require('dotenv').config();
// Import express
let express = require('express');
const responseTime = require('response-time');
// Initialize the app
let app = express();
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

// Import routes
let apiRoutes = require("./api-routes")


// use response-time as a middleware
app.use(responseTime());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
var dbhost = process.env.DB_HOST;
var dbport = process.env.DB_PORT;
var dbname = process.env.DB_NAME;

mongoose.connect('mongodb://'+dbhost+':'+dbport+'/'+dbname, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

var db = mongoose.connection;
// Setup server port
var port = process.env.APP_PORT;

// Send message for default URL
var appname = process.env.APP_NAME;
var appnver = process.env.APP_VERSION;
app.get('/', (_req, res) => res.send(appname+' V'+appnver));
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running ahmadREST on port " + port);
});