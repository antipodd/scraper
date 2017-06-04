// ******************************************************************************
// Server.js 
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var logger = require("morgan");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var exphbs = require('express-handlebars');

/*// =============================================================
// *** Import Models
// =============================================================
var Article = require(".models/Article.js");
var Comment = require(".models/Comment.js");*/

// =============================================================
// *** Set mongoose to leverage built in JavaScript ES6 Promises
// =============================================================
mongoose.Promise = Promise;

// =============================================================
// *** Initialize Express
// =============================================================
var app = express();

// =============================================================
// *** Database configuration with Mongoose
// =============================================================
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/week18scraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// =============================================================
// *** Configure Port
// =============================================================
var port = process.env.PORT || 3000;

// =============================================================
// *** Set BodyParser and Morgan
// =============================================================
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// =============================================================
// *** Override with POST having ?_method=PUT
// =============================================================
//app.use(methodOverride("_method"));

// =============================================================
// *** Set Handlebars
// =============================================================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// =============================================================
// *** Import and use Routes
// =============================================================
var articlesRoutes = require("./controllers/articles_controller.js");
var commentsRoutes = require("./controllers/comments_controller.js");
app.use("/", articlesRoutes);
app.use("/", commentsRoutes);

// =============================================================
// *** Express port listener
// =============================================================
app.listen(port, function() {
  console.log("App running on port" + port);
});