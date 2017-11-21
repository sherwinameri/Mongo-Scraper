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

  axios.get("http://www.echojs.com/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("article h2").each(function(i, element) {
      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.Article
        .create(result)
        .then(function(dbArticle) {
          res.send("Scrape Complete!!!");
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  });
});

app.get("/articles", function(req, res) {

  db.Article
    .find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
  })
    .catch(function(err) {
      res.json(err);
  });

});

app.get("/articles/:id", function(req, res) {

});

// app.post("/articles/:id", function(req, res) {

// });

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});