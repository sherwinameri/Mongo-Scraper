var express = require("express");
var expressHandleBars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");
var logger = require("morgan");
var axios = require("axios");

// var routes = require("./controllers/controllers.js")

var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.engine("handlebars", expressHandleBars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraper" ;
mongoose.connect("mongodb://localhost/mongoScraperHW", {
  useMongoClient: true
});

/////////////

// scrapes upon running the server (root)
app.get("/", function(req, res) {

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
          res.send("Scrape Complete!!! (go to the '/articles' route now!)");
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  });
});

// show articles
app.get("/articles", function(req, res) {

  db.Article
    .find({})
    .then(function(dbArticle) {
        var hbsObject = {
          myKey: "Hello my name is Earl",
          allArticles: dbArticle
        };

  res.render("index", hbsObject);

  })
    .catch(function(err) {
      res.json(err);
  });


});

// app.get("/articles/:id", function(req, res) {

//   var id = req.params.id ;

//     db.Article
//     .find({_id: id})
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//   })
//     .catch(function(err) {
//       res.json(err);
//   });

// });

// app.get("/articles/saved", function(req, res) {

//   db.Article
//     .find({saved: true})
//     .then(function(dbArticles) {
//       console.log(dbArticles);

//       if (dbArticles.length = 0) {
//         var article = {
//           article: dbArticles
//         }
//         res.
//       } else {

//       }
//     }

//     }







//  });

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});