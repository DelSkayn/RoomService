var Types = require("./src/databaseTypes.js");
var Types = require("./src/databaseTypes.js");
var express = require('express');
var async = require('async');
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
app.use("/image-map-resizer",express.static(client_dir + "/image-map-resizer"));

//log on error
app.on('error', function (err){
    console.log(err.message);
});

app.get('/',function(req,res){
    if(typeof req.session.userName !== 'undefined'){
        console.log("user is loged in");
        res.render("index.ejs",{username: req.session.userName});
    }else{
        res.render("index.ejs");
    }
});

app.get("/login", function(req, res){ 
    if(typeof req.session.error !== 'undefined'){
        res.render("web/login.ejs",{error: req.session.error,});
    }else{
        res.render("web/login.ejs");
    }
});

app.post("/login", function(req, res){ 
    console.log("Post equals: ");
    console.log(req.body);
    if(typeof req.body.name !== 'undefined'){
        Types.User.findOne({userName: req.body.name,passWord: req.body.pass}
            ,function(err,data){
        if(data){
            console.log("User logging in");
            req.session.regenerate(function(){
                req.session.userName = data.userName;
                req.session.isAdmin = data.isAdmin;
                req.session.auth = true;
                res.redirect('/');
            });
        }else{
            console.log("User auth failed");
            req.session.error = 'Authentication failed';
            res.redirect('/login');
        }
            });
    }
});

app.get("/register", function(req, res){ 
    if(typeof req.session.error !== 'undefined'){
        res.render("web/register.ejs",{error: req.session.error,});
    }else{
        res.render("web/register.ejs");
    }
});

app.post("/register", function(req, res){ 
    console.log("Post equals: ");
    console.log(req.body);
    if( (typeof req.body.name !== 'undefined')&&
       (typeof req.body.pass !== 'undefined') &&
           (typeof req.body.pass2 !== 'undefined') &&
               (typeof req.body.check !== 'undefined') &&
                   (typeof req.body.email !== 'undefined')){

        if(req.body.check != 'on'){
            req.session.error = "Please check the box";
            res.redirect("/register");
        }else if(req.body.pass != req.body.pass2){
            req.session.error = "Passwords dont match";
            res.redirect("/register");
        }else if(req.body.name === "") {
            req.session.error = "Please fill in a name";
            res.redirect("/register");
        }else if(req.body.pass.length < 5){
            req.session.error = "Please use a pass longer then 5 ";
            res.redirect("/register");
        }else{

            Types.User.findOne({userName: req.body.name},function(err,data){
                if(data){
                    req.session.error = "Username already taken";
                    res.redirect("/register");
                }else{
                    var newUser = new Types.User({
                        userName:req.body.name,
                        passWord: req.body.pass,
                        eMail: req.body.email,
                        isAdmin: false,
                    });
                    newUser.save(function(err){
                        console.log(err);
                    });
                    res.redirect("/");
                }
            });
        }

    }else{
        req.session.error = "Please check the box";
        res.redirect("/register");
    }
});


app.get("/floor", function(req, res){ 
    var floor = req.query.floorname;
    console.log(floor);
    if(floor){
        Types.Floor.findOne({floorName: floor},'floorName floorPicture',function(err,data){
            if(data){
                Types.Room.find({floorId: data._id},function(err2,roomData){
                    console.log(roomData);
                    console.log(data);
                    res.render("web/floors.ejs",{
                        link: data.floorPicture,
                        rooms: roomData,
                    });
                });
            }else{
                req.session.error = "Floor not found";
                res.redirect("/register");
            }
        });
    }else{
        res.redirect('back');
    }
});

app.get("/room", function(req, res){ 
    var room = req.query.roomname;
    console.log(room);
    if(room){
        Types.Floor.findOne({roomName: room},'roomPicture',function(err,data){
            if(data){
                console.log(roomData);
                console.log(data);
                res.render("web/rooms.ejs",{
                    link: data.roomPicture,
                });
            }else{
                req.session.error = "room not found";
                res.redirect("/register");
            }
        });
    }else{
        res.redirect('back');
    }
});

app.get("/logout",function(req,res){
    req.session.destroy();
    res.redirect("/");
});

app.get("/comment",function(req,res){
    var room = req.query.room;
    console.log(room);
    if(room){
        Types.Room.findOne({roomName: room},'roomName',function(err,data){
            if(data){
                Types.Comment.find({roomID: data._id},"commentText userID",function(err,commdata){
                    var res_data = new Object;
                    console.log(room);
                    if(typeof req.session.userName !== 'undefined'){
                        console.log("user is logged in");
                    }
                    res_data.username = req.session.userName;
                    res_data.name = room;
                    res_data.comments = [];
                    if(commdata.length > 0){
                        console.log(commdata);
                        console.log(commdata.length);
                        async.filter(commdata,function(elem,callback){
                            var id = elem.userID;
                            Types.User.findOne({_id:id},'userName',function(err,userdata){
                                res_data.comments.push(
                                    {username: userdata.userName
                                ,text: elem.commentText}
                                );
                                callback();
                            });
                        },function(){
                            console.log("called");
                            res.render("web/comments.ejs",res_data);
                        });
                    }else{
                        res.render("web/comments.ejs",res_data);
                    }
                });
            }else{
                req.session.error = "room not found";
                res.redirect("/register");
            }
        });
    }else{
        res.render("web/comments.ejs");
    }
});

app.post("/post-comment",function(req,res){
    var name = req.session.userName;
    var text = req.body.commentText;
    var room = req.query.room;
    Types.User.findOne({userName: name},function(err,data){
        Types.Room.findOne({roomName: room},function(errr,rdata){
            console.log(rdata);
            var comment = Types.Comment({
                userID: data._id,
                dateComment: new Date(),
                commentText: text,
                roomID:rdata._id,
            });
            console.log(comment);
            comment.save(function(err){console.log(err)});
            res.redirect('back');
        });
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

app.listen(8090);
console.log("Web server started");
