//testing sending emails
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codemailbox1208@gmail.com',
    pass: 'codemailbox1!'
  }
});

//mysql connection
var mysql = require("mysql");

// Test Pool
var pool = mysql.createPool({
   connectionLimit: 10,
   host : 'us-cdbr-iron-east-04.cleardb.net',
   user : 'b6633b71acf36b',
   password: 'c8760750',
   database: 'heroku_20540d41c0ab631'
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
    pool.query(queryString, function(err, res){
      if(err) {console.log(err);}

      //handlebar object
      myhbsObject = {myInfo: res};
      //pass myhbsOjbect to profile handlebars
    });
    res.redirect('/profile')    
  });

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

    pool.query(queryString, function(err, res){
        if(err) {console.log(err);}
        console.log("db created!")
    });
    res.redirect('/profile')
});

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
    pool.query(queryString, function(err,response){
        if(err) {
            console.log(err);
            console.log("result error");
        }
        console.log("Data Response: ", response);
        console.log("------------------------");
        let data = {dog_profile: response};
        console.log(data);
        res.render("result", data)
    });
});

app.get("/profile", function(req, res){
    //get these values from login pages
    //for now they have test values
    var myEmail = "ncubley1@amazon.co.uk";
    var myZipcode = "93915";
    
    //DB query
    var queryString = 'SELECT * FROM ' + dbTable + ' WHERE email ="'+ myEmail + '" and zipcode = '+myZipcode + ';';
    //console.log(queryString);
    pool.query(queryString, function(err, results){
        if(err) {console.log(err);}
        //handlebar object
        myhandlebarObj = {myProfile: results};
        //console.log(myhandlebarObj);
    res.render("profile", myhandlebarObj);
    });
});

//create something for /update where user is able to edit profile information and it sends it to DB
//app.post(“/update”, function(req,res){
//});

app.get("/scheduler", function(req, res){
   res.render("scheduler");
});

//section to test sending email from scheduler
app.post("/scheduler", function(req, res){    
    var myEmail = req.body.email;
    var mySubject = req.body.sub;
    var myDate = req.body.date;
    var myTime = req.body.time;
    var myMessage = req.body.message;
    
    var mailOptions = {
        from: 'codemailbox1208@gmail.com',
        to: myEmail,
        subject: mySubject + " - " + myDate + " - " + myTime,
        text: myMessage
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    res.redirect('/thanks')
});
//

app.get("/thanks", function(req, res){
    res.render("thanks");
 });

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("listening on " + PORT);
});

