var Types = require("./src/databaseTypes.js");
var Types = require("./src/databaseTypes.js");
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();

var client_dir = __dirname+ '/../client/';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser('smds84hjy9x53hy90g7'));
app.use(session({resave: true,saveUninitialized: false
    ,secret: "Shhh this is a secret"}));


app.set('views', client_dir);
app.set('view engine','ejs');
app.engine('html' ,require('ejs').renderFile);

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

app.get('/',function(req,res){
    res.render("index.ejs");
});

app.get("/login", function(req, res){ 
    if(typeof req.session.error !== 'undefined'){
        res.render("web/login.ejs",{error: req.session.error});
    }else{
        res.render("web/login.ejs");
    }
});

app.post("/login", function(req, res){ 
    console.log("Post equals: ");
    console.log(req.body);
    if(typeof req.body.name !== 'undefined'){
        Types.User.findOne({userName: req.body.name,passWord: req.body.pass}
            ,function(err,ress){
            if(res){
                console.log("User logging in");
                req.session.regenerate(function(){
                    req.session.userName = data.userName;
                    req.session.isAdmin = data.isAdmin;
                    req.session.auth = true;
                    res.redirect('back');
                });
            }else{
               console.log("User auth failed");
               req.session.error = 'Authentication failed';
               res.redirect('login');
            }
        });
    }
});

app.get("/register", function(req, res){ 
    res.render("web/register.ejs");
});

app.post("/register", function(req, res){ 
    res.render("web/register.ejs");
});

app.post("/floor", function(req, res){ 
    res.render("web/floor.ejs");
});

app.post("/room", function(req, res){ 
    res.render("web/room.ejs");
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
