//mysql connection
var mysql = require("mysql");

//DB connection (clearDB)
var connection = mysql.createConnection({
    host : 'us-cdbr-iron-east-04.cleardb.net',
    user : 'b6633b71acf36b',
    password: 'c8760750',
    database: 'heroku_20540d41c0ab631'
});

//DB connection (mysql)
//var connection = mysql.createConnection({
//    host : 'localhost',
//    user : 'web',
//    password: '1234',
//    database: 'dogprofile'
//});

connection.connect();

//DB query
//var dbTable = "dogprofile.dog_info";
var dbTable = "heroku_20540d41c0ab631.dog_info"
var queryString = 'SELECT * FROM ' + dbTable + ' LIMIT 10';
var handlebarObj = 0;

connection.query(queryString, function(err, res){
    if(err) {
        console.log(err);
    }
    //console.log(res);

    //handlebar object
    handlebarObj = {dog_info: res};
})

connection.end();

//display
var express = require("express");
var app = express();

//set handlebars as the view engine
var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}));
app.set("view engine", "handlebars");

app.get("/", function(req, res){
    res.render("index");
});

app.get("/search", function(req, res){
    res.render("search", handlebarObj);
});

app.get("/scheduler", function(req, res){
    res.render("scheduler");
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("listening on " + port);
});