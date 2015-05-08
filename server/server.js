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
app.use(session({resave: true,saveUninitialized: false,secret: "Shhh this is a secret"}));


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

function auth(name, pass, fn){
    Types.User.findOne({userName: name, passWord: pass}, function(err,ress){
        if(err){
            return fn(new Error("Database error"),err);
        }
        if(ress){
            return fn(null,ress);
        }else{
            return fn(null,null);
        }
    });
}

app.get('/',function(req,res){
    console.log("called");
    res.render("index.ejs");
});

//redirect index.html to /
app.get('/index.html',function(req,res){
    res.redirect('/');
});

app.get('/register',function(req,res){
    res.render('web/register.ejs');
});

app.post('/register',function(req,res){
    if(typeof req.body.name !== 'undefined')
    Types.User.find({userName: req.body.name}, function(err,ress){
        if(ress.length == 0){

            console.log("Registering new user :" + req.body.name);
            newUser = new Types.User({
                userName: req.body.name,
                passWord: req.body.pass,
                eMail: req.body.email,
                isAdmin: false,
            });
            newUser.save(function(err){
                if(err !== null){
                    console.log("Error during registering");
                    console.log(err);
                }
            });
        }
        else{
            res.render('web/register.ejs',{error: 'User name already taken'});
        }
    });
});

app.get('/login', function(req, res){
    if(typeof req.session.error !== 'undefined'){
        res.render('web/login.ejs',{error: req.session.error});
    }else{
        res.render('web/login.ejs');
    }
});

app.post("/login", function(req, res){
    auth(req.body.name,req.body.pass,function(err,data){
        if(err){
            console.log("Database error");
            res.render('web/login.ejs',{msg:'Hmmm an error happend, Where sorry'});
            console.log(data);
            return;
        }
        if(data){
            console.log("Auth passed");
            req.session.regenerate(function(){
                req.session.user = data.userName;
                res.redirect('back');
            });
        }else{
            console.log("Auth failed");
            req.session.error = 'Authentication failed';            
            res.redirect('login');
        }
    });
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

app.listen(8090,function(){
    console.log("Web server started");
});
