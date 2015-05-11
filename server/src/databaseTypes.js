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

var User = mongoose.model('User',UserSchema);

var roomSchema = new mongoose.Schema({
	roomPos: String,
	roomName:{type : String, unique : true, required : true, dropDups : true},
    roomPicture:{type: String, required : true},
 	floorfloor: String,//floor is keyword jammergenoeg

});

var ratingRoomSchema = new mongoose.Schema({
	rating: Number,
	userID: {type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},
	roomID: {type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},

});

var tableSchema = new mongoose.Schema({
	roomPos: String,
	roomID: {type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},	
});

var commentSchema = new mongoose.Schema({
	userID: {type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},
	dateComment: Date,
	commentText: {type : String, unique: false, required: false, maxlength : 120},
	roomID:{type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},
});

exports.User = User;
