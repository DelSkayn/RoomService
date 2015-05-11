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

var floorSchema = new mongoose.Schema({
    floorName: {type: String, unique : true, required: true, dropDups : true},
    floorPicture: {type: String, required: true},
});

var Floor = mongoose.model('Floor',floorSchema);

var roomSchema = new mongoose.Schema({
 	floorId: {type : mongoose.Schema.Types.ObjectId, required : true},
	roomPos: [Number],
	roomName:{type : String, unique : true, required : true, dropDups : true},
    roomPicture:{type: String, required : true},
});

var Room = mongoose.model('Room', roomSchema);

var ratingRoomSchema = new mongoose.Schema({
	rating: Number,
	userID: {type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},
	roomID: {type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},
});

var Rating = mongoose.model('RatingRoom', ratingRoomSchema);

var tableSchema = new mongoose.Schema({
	roomPos: String,
	roomID: {type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},
});

var Table = mongoose.model('Table',tableSchema);

var commentSchema = new mongoose.Schema({
	userID: {type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},
	dateComment: Date,
	commentText: {type : String, unique: false, required: false, maxlength : 120},
	roomID:{type : mongoose.Schema.Types.ObjectId, unique : true, required : true, dropDups : true},
});

var Comment = mongoose.model('Comment', commentSchema);

exports.User = User;
exports.Table = Table;
exports.Floor = Floor;
exports.Rating = Rating;
exports.Comment = Comment;
