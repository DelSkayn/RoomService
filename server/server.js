var Types = require("./src/databaseTypes.js");
var express = require('express');

var app = express();

var client_dir = __dirname+ '/../client/';

app.set('views', client_dir);
app.engine('html' ,require('ejs').renderFile);

app.get('/',function(req,res){
    res.render("index.html");
});

//redirect index.html to /
app.get('/index.html',function(req,res){
    res.redirect('/');
});

//allow excess to resources
app.use("/style", express.static(client_dir + '/style'));
app.use("/bootstrap", express.static(client_dir + '/bootstrap'));
app.use("/jquery", express.static(client_dir + '/jquery'));
app.use("/src", express.static(client_dir + '/src'));
app.use("/res", express.static(client_dir + '/res'));

//log on error
app.on('error', function (err){
    console.log(err.message);
});

//look if the connection actually works
Types.User.find({isAdmin: true}, function(err,admins){
    if(err){
        console.error.bind(console, 'Query error');
    }
    console.log("Admins are: ");
    for(var i = 0;i < admins.length;i++){
        console.log(" * " + admins[i].userName);
    }
});

app.listen(8090);
console.log("Web server started");
