// ******************************************************************************
// comments_controller.js 
//
// ******************************************************************************
// *** Dependencies
// =============================================================

var express = require("express");
var router = express.Router();

// =============================================================
// *** Import Models
// =============================================================
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");


	router.post("/note/article/:id", function(req, res) {
  		// Use our Comment model to make a new comment from the req.body
		var newComment = new Comment(req.body);
		// Save the new comment to mongoose
		newComment.save(function(error, doc) {
			if (error) {
      			res.sendStatus(400);
      			//res.send(error);
      		} else {
		    
			    // Find our article and push the new comment id into the article's comments array
			    Article.findOneAndUpdate({"_id": req.params.id}, { $push: { "comments": doc._id } }, { new: true }, function(err, newdoc) {
			        //redirect user to the "/" page
			        res.redirect("/");
			    });
			}
		});
	});
	

	router.post("/delete/:id", function(req,res) {
		Comment.remove({"_id": req.params.id}, function(err, doc) {
			res.redirect("/");
		});
	});

module.exports = router;