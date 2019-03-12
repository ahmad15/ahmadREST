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
var dburi = process.env.DB_URI;

mongoose.connect(dburi, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, function (err, db) {
   if (err) {
     console.log('Unable to connect to the mongoDB server. Error:', err);
   } else {
     console.log('Connection established to', dburi);
 
     // do some work here with the database.
 
     //Close connection
     db.close();
   }
});

var db = mongoose.connection;
// Setup server port
// var port = process.env.APP_PORT;
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

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
