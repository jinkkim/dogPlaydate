//mysql connection
var mysql = require("mysql");

// DB connection (clearDB)
//var connection = mysql.createPool({
//    connectionLimit: 10,
//    host : 'us-cdbr-iron-east-04.cleardb.net',
//    user : 'b6633b71acf36b',
//    password: 'c8760750',
//    database: 'heroku_20540d41c0ab631'
//});

//DB connection (mysql)
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'web',
  password: '1234',
  database: 'dogprofile',
  port: 3306
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

//DB query
//var dbTable = "dogprofile.dog_info";
var dbTable = "dog_info"
var queryString = '';
var handlebarObj = '';
var myhandlebarObj = '';


//display
var express = require("express");
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(process.cwd() + '/public'));

//set handlebars as the view engine
var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}));
app.set("view engine", "handlebars");


//index.html --> index.handlebars
app.get("/", function(req, res){
    res.render("index");
});

//contact.html --> contact.handlebars
app.get("/contact",function(req, res){
    res.render("contact");
});

//login.html --> login.handlebars
app.get("/login", function(req, res){
    res.render("login");
});

app.get('/searchme', function(req, res){
  
    var myEmail = req.query.email;
    var myZipcode = req.query.zipcode;
  
    //DB query
    var queryString = 'SELECT * FROM ' + dbTable + ' WHERE first_name = "'+ myEmail+ '" and zipcode = '+ myZipcode + ';';
    connection.query(queryString, function(err, res){
      if(err) {console.log(err);}
      //handlebar object
      myhbsObject = {myInfo: res};
    });
    
    //pass myhbsOjbect to profile handlebars
  });



//signup.html --> create.handlebars

app.get('/create', function(req, res){
    res.render('create');
});

app.post('/create', function(req, res){
    
    var myFirstName = req.body.first_name;
    var myLastName = req.body.last_name;
    var myEmail = req.body.email;
    var myAddress = req.body.address;
    var myZipcode = req.body.zipcode;
    var myDogName = req.body.dog_name;
    var myDogBreed = req.body.dog_breed;
    var myDogGender = req.body.dog_gender;
    var myDogAge = req.body.dog_age;
    var myDogPersonality = req.body.dog_personality;
    // var myDogWeight = req.body.dog_weight;
    //var myDogdescription = req.body.dog_description;

    var queryString = 'INSERT INTO ' + dbTable +
        ' (first_name, last_name, email, address, zipcode, dog_name, dog_breed, dog_gender, dog_age, dog_personality ) VALUES ("'+ 
        myFirstName + '", "' + myLastName + '", "' + myEmail + '", "' + myAddress + '", ' + myZipcode + ', "' + myDogName + '", "' + myDogBreed + '", "' + myDogGender + '", "' + myDogAge + '", "'  + myDogPersonality + '")';

    
    connection.query(queryString, function(err, res){
        if(err) {console.log(err);}
        console.log("db created!")
    });

});


// date.html --> search.handlebars

app.get('/search', function(req, res){
    res.render('search');
});

app.get('/result',function(req,res){
    var zipcode = parseInt(req.query.zipcode.substr(0,2));
    var dogPersonality = req.query.dog_personality;
    var dogGender = req.query.dog_gender;
    var dogAge = parseInt(req.query.dog_age);
    var dogWeight = parseInt(req.query.dog_weight); 

    var queryString = 'SELECT * FROM ' + dbTable;
    if (zipcode){
        queryString+=' WHERE zipcode LIKE "' + zipcode + '___"';
    }

    if (dogPersonality){
        queryString+=' AND dog_personality = "' + dogPersonality + '"';
    }

    if (dogGender){
        queryString+=' AND dog_gender = "' + dogGender + '"';
    }

    if (dogAge){
        queryString+=' AND dog_age = "' + dogAge + '"';
    }

    if (dogWeight){
        queryString+=' AND dog_weight = "' + dogWeight + '"';
    }
    console.log("Query", queryString);
    connection.query(queryString, function(err,response){
        if(err) {console.log(err);}
        console.log("Data Response: ", response);
        console.log("------------------------");
        let data = {dog_profile: response};
        console.log(data);
        res.render("result", data)
    });
});


//profile.html --> profile.handlebars

app.get("/profile", function(req, res){
    
    //get these values from login pages
    //for now they have test values
    var myEmail = "ncubley1@amazon.co.uk";
    var myZipcode = "93915";
    
    //DB query
    var queryString = 'SELECT * FROM ' + dbTable + ' WHERE email ="'+ myEmail + '" and zipcode = '+myZipcode + ';';
    //console.log(queryString);
    connection.query(queryString, function(err, results){
        if(err) {console.log(err);}
        //handlebar object
        myhandlebarObj = {myProfile: results};
        console.log(myhandlebarObj);
    res.render("profile", myhandlebarObj);
    });
    
    
});


//app.get("/scheduler", function(req, res){
//    res.render("scheduler");
//});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("listening on " + PORT);
});