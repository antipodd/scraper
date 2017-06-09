# Kotaku Scraper!

## About the App

This is a Node.js/Express/MongoDB app that uses Request and Cheerio to scrape the gaming website Kotaku, stores the relevent information to MongoDB using Mongoose as the MongoDB object modeling tool and displays the title, link, image, excerpt, author and date published of the articles scraped.  The articles are ordered such that the most recent article is shown at the top of the page.  The front end has been built using Handlebars and jQuery.

The user is able to leave comments in the collapsible comments section associated with each article, and can delete any comment that has previously been submitted.  Upon submission of a comment, the page refreshes and automatically scrolls to the section where the comment was made (achieved by using local storage).  Client-side validation checks to see if the comment section is empty and an empty comment cannot be submitted (back-end validation is also present).

## Usage

1. Type `npm install` in the command line in order to retrieve all the dependencies of this app

2. In a separate bash window, type `mongod` to establish a connection to the MongoDB

3. Run `node server.js` in your first bash window 

[click here to see the app in action!](https://serene-headland-87456.herokuapp.com/)