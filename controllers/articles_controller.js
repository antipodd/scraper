// ******************************************************************************
// articles_controller.js 
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var request = require("request");
var cheerio = require("cheerio");
var express = require("express");
var mongoose = require("mongoose"); //do I need this here?
var router = express.Router();

// =============================================================
// *** Import Models
// =============================================================
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

// =============================================================
// *** Routes
// =============================================================

	router.get("/", function(req, res) {
		Article.find({}).populate("comments").exec(function(error, doc) {
			if(error) {
			res.send(error)
			} else {
				var hbsObject = {
					articles: doc
				};
			res.render("index", hbsObject);
			}
		});	
	});

	router.get("/scrape", function(req, res) {
		request('http://kotaku.com/', function (error, response, html) {

			// Load the HTML into cheerio and save it to a variable
  			// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  			var $ = cheerio.load(html);
		  

		  	// Select each instance of the HTML body that you want to scrape
		  	// NOTE: Cheerio selectors function similarly to jQuery's selectors, 
		  	// but be sure to visit the package's npm page to see how it works
		  	$('h1.headline').each(function(i, element){

			  	var result = {};
			    result.link = $(this).children().attr("href");
			    result.title = $(this).children().text();
			    //need to try to grab image - this also grabs ads
			    //probably need to check here if article already exists in mongodb
			    // Pass the result of the scrape into a new variable
			    var entry = new Article(result);

			    // Save entry to db
			    entry.save(function(err, doc) {
			    	// Log errors
			    	if (err) {
			    		console.log(err);
			    	}
			    	// log the doc
			    	else {
			    		console.log(doc);
			    	}
			    });
		  	});
		});
		// Tell the browser that we finished scraping the text
  		res.send("Scrape Complete");
	});

	/*router.get("/articles", function(req, res) {
		Article.find({}, function(error, doc) {
			if(error) {
			res.send(error)
			} else {
			res.send(doc)
			}
		});	
	});*/

module.exports = router;
