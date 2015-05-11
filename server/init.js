var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RoomService');

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback){
    console.log("Connection to Database created");	
});


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

var admin_peoples = [new User({
    userName: 'Skayn',
    passWord: 'LolNo',
    eMail: "yoko.minsky@gmail.com",
    isAdmin: true,
}),new User({
    userName: 'Lokyar',
    passWord: 'Ehmmmm',
    eMail: "something@hotmail.com",
    isAdmin: true,
}),new User({
    userName: 'Mick',
    passWord: 'Banana',
    eMail: "Bananan@gmail.com",
    isAdmin: true,
})];

function doError(err){
    if (err) {
        console.log("Error happend during user save");
        return handleError(err);
    }
}

admin_peoples.forEach(function(adm){
    User.find({userName: adm.userName},function(err,res){
        console.log(res);
        if (res.length == 0) {
            console.log("Admin: " + adm.userName + " not found saving");
            adm.save(doError);
        }else{
            console.log('Admin: ' + adm.userName + " Already exists"); 
        }
    });
});

var floors = [
    new Floor({
        floorName: "f1",
        floorPicture: "f1.jpg",
    }),
    new Floor({
        floorName: "f0",
        floorPicture: "f0.jpg",
    })];
        
floors.forEach(function(adm){
    User.find(adm,function(err,res){
        console.log(res);
        if (res.length == 0) {
            adm.save();
        }else{
            console.log("not saving");
        }
    });
});


