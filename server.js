var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");

var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoScraperHW", {
  useMongoClient: true
});

app.get("/scrape", function(req, res) {

});

app.get("/articles", function(req, res) {

});

app.get("/articles/:id", function(req, res) {

});

// app.post("/articles/:id", function(req, res) {

// });

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});