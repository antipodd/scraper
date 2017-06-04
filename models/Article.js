// ******************************************************************************
// Article.js 
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var mongoose = require('mongoose');

// =============================================================
// *** Create Schema
// =============================================================
var Schema = mongoose.Schema;

var ScrapedArticle = new Schema ({
	title: {
		type: String,
		required: true,
		trim: true
	},
	link: {
		type: String,
		required: true
	},
	/*img: {
		type: String,
		required:true
	},*/
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

// =============================================================
// *** Create Article Model
// =============================================================
var Article = mongoose.model('Article', ScrapedArticle);

// =============================================================
// *** Export the Article Model
// =============================================================
module.exports = Article;