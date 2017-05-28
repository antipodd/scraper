// ******************************************************************************
// Server.js 
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var exphbs = require('express-handlebars');


// =============================================================
// *** Configure Port
// =============================================================
var port = process.env.PORT || 3000;


// =============================================================
// *** Set BodyParser
// =============================================================
app.use(bodyParser.urlencoded({ extended: false }));


// =============================================================
// *** Override with POST having ?_method=PUT
// =============================================================
app.use(methodOverride("_method"));


// =============================================================
// *** Set Handlebars
// =============================================================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// =============================================================
// *** Express port listener
// =============================================================
app.listen(port, function() {
  console.log("App running on port" + port);
});