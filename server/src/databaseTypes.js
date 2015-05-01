var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RoomService');

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(err,callback){
    console.log("Connection to Database created");	
});

//Objects have an ID by default
var UserSchema = new mongoose.Schema({
	userName: {type : String, unique : true, required : true, dropDups : true},
	passWord: {type : String, required : true, dropDups : true, minlength: 5},
	eMail: String,
	isAdmin: Boolean,
});

var RoomSchema = new mongoose.Schema({
});

var User = mongoose.model('User',UserSchema);

//TODO fully implement
//max kijk hier naar
var roomSchema = new mongoose.Schema({
    floor: String,

});

exports.User = User;
