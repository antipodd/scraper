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
		//scrapeArticles();
		//Article.find({ sort: {"date": -1}}).populate("comments").exec(function(error, doc) {
		Article.find({}).populate("comments").sort({"date": -1}).exec(function(error, doc) {
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
		// Create an empty object that will hold all the articles currently existing in the db
		var articlesInDb;

		Article.find({}, function(error, doc) {
			articlesInDb = doc;
			console.log(articlesInDb);
		});

		request('http://kotaku.com/', function (error, response, html) {

			// Load the HTML into cheerio and save it to a variable
  			// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  			var $ = cheerio.load(html);
		  

		  	// Select each instance of the HTML body that you want to scrape
		  	// NOTE: Cheerio selectors function similarly to jQuery's selectors, 
		  	// but be sure to visit the package's npm page to see how it works
		  	//$('h1.headline').each(function(i, element){
		  	$("article.status-published").each(function(i, element){
			  	var result = {};
			    result.link = $(this).find("header").find("h1").find("a").attr("href");
			    result.title = $(this).find("header").find("h1").text();
			    result.img = $(this).find("div.item__content").find("figure").find("a").find("div").find("picture").find("source").attr("data-srcset");
			    result.excerpt = $(this).find("div.item__content").find("div.excerpt").find("p").text();
			    result.date = $(this).find("header").find("div.meta--pe").find("div.meta__text").find("time").attr("datetime");
		    	result.author = $(this).find("header").find("div.meta--pe").find("div.meta__text").find("div.meta__byline").find("a").text();
		    	result.datePub = $(this).find("header").find("div.meta--pe").find("div.meta__text").find("time").find("a").attr("title");
			    //need to try to grab image - this also grabs ads
			    //probably need to check here if article already exists in mongodb
			    // Pass the result of the scrape into a new variable

			    // Iterate over existing db to see if article has already been scraped
			    var counter = 0;
			    for (var i = 0; i < articlesInDb.length; i++) {
			    	// If article exists
			    	if (result.title === articlesInDb[i].title) {
			    		counter++;
			    	};
			    };
			    // If article doesn't exist counter === 0, save article to db
			    if (counter === 0) {
			    	var entry = new Article(result);

				    // Save entry to db
				    entry.save(function(err, doc) {
				    	// Log errors
				    	if (err) {
				    		console.log(err);
				    	}
				    	// log the doc
				    	else {
				    		//console.log(doc);
				    	}
				    });
			    }
			    
		  	});
		  	res.redirect("/");
		});
		/*// Tell the browser that we finished scraping the text
  		res.send("Scrape Complete");*/
  		
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

	// Create an empty object that will hold all the articles currently existing in the db
/*function scrapeArticles() {		
	var articlesInDb;

	Article.find({}, function(error, doc) {
		articlesInDb = doc;
		console.log(articlesInDb);
	});

	request('http://kotaku.com/', function (error, response, html) {

	// Load the HTML into cheerio and save it to a variable
  	// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  	var $ = cheerio.load(html);
		  

	// Select each instance of the HTML body that you want to scrape
		// NOTE: Cheerio selectors function similarly to jQuery's selectors, 
		// but be sure to visit the package's npm page to see how it works
		//$('h1.headline').each(function(i, element){
		$("article.status-published").each(function(i, element){
		  	var result = {};
		    result.link = $(this).find("header").find("h1").find("a").attr("href");
		    result.title = $(this).find("header").find("h1").text();
		    result.img = $(this).find("div.item__content").find("figure").find("a").find("div").find("picture").find("img").attr("src");
		    result.excerpt = $(this).find("div.item__content").find("div.excerpt").find("p").text();
		    result.date = $(this).find("header").find("div.meta--pe").find("div.meta__text").find("time").attr("datetime");
		    result.author = $(this).find("header").find("div.meta--pe").find("div.meta__text").find("div.meta__byline").find("a").text();
		    result.datePub = $(this).find("header").find("div.meta--pe").find("div.meta__text").find("time").find("a").attr("title");
		    //need to try to grab image - this also grabs ads
		    //probably need to check here if article already exists in mongodb
		    // Pass the result of the scrape into a new variable

		    // Iterate over existing db to see if article has already been scraped
		    var counter = 0;
		    for (var i = 0; i < articlesInDb.length; i++) {
		    	// If article exists
		    	if (result.title === articlesInDb[i].title) {
		    		counter++;
		    	};
		    };
		    // If article doesn't exist counter === 0, save article to db
		    if (counter === 0) {
		    	var entry = new Article(result);
				    // Save entry to db
			    entry.save(function(err, doc) {
			    	// Log errors
			    	if (err) {
			    		console.log(err);
			    	}
			    	// log the doc
			    	else {
			    		//console.log(doc);
			    	}
			    });
		    }
		    
		});
	});
}
*/
module.exports = router;
