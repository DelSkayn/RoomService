var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RoomService');

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback){
    console.log("Connection to Database created");	
});

var roomses =[

new Room({
roomname:"312",

roomPos: [840,18,960,180],

roomPicture: "res/312.png",
})

new Room({
roomname:"313",

roomPos: [970,18,1110,180],

roomPicture: "res/313.png",
})

new Room({
roomname:"306/308",

roomPos: [835,300,940,515],

roomPicture: "res/302/png",
})


new Room({
roomname:"302/304",

roomPos: [835,529,940,740],

roomPicture: "res/302.png",

new Room({
roomname:"309",

roomPos: [1000,300,1100,405],

roomPicture: "res/303.png",

new Room({
roomname:"307",

roomPos: [1000,410,1100,515],

roomPicture: "res/303.png",

new Room({
roomname:"305",

roomPos: [1000,520,1100,630],

roomPicture: "res/303.png",

new Room({
roomname:"303",

roomPos: [1000,635,1100,740],

roomPicture: "res/303.png",

new Room({
roomname:"301/DLF",

roomPos: [1000,750,1100,850],

roomPicture: "res/DLF.jpg",

new Room({
roomname:"B4",

roomPos: [10,535,240,650],

roomPicture: "res/B02.jpg",

new Room({
roomname:"B3",

roomPos: [10,655,240,765],

roomPicture: "res/B02.jpg",
})


new Room({
roomname:"B2",

roomPos: [10,775,240,885],

roomPicture: "res/B02.jpg",
})

new Room({
roomname:"B1",

roomPos: [10,895,225,1005],

roomPicture: "res/B02.jpg",
})

new Room({
roomname:"412",

roomPos: [340,20,465,185],

roomPicture: "res/312.jpg",
})

new Room({
roomname:"413",

roomPos: [475,20,605,185],

roomPicture: "res/313.jpg",
})

new Room({
roomname:"410",

roomPos: [335,190,440,300],

roomPicture: "res/312.jpg",
})

new Room({
roomname:"408",

roomPos: [335,305,440,410],

roomPicture: "res/312.jpg",
})

new Room({
roomname:"406",

roomPos: [335,415,440,525],

roomPicture: "res/312.jpg",
})

new Room({
roomname:"404",

roomPos: [335,525,440,635],

roomPicture: "res/312.jpg",
})

new Room({
roomname:"402",

roomPos: [335,640,440,745],

roomPicture: "res/312.jpg",
})

new Room({
roomname:"411",

roomPos: [505,190,605,300],

roomPicture: "res/303.jpg",
})

new Room({
roomname:"409",

roomPos: [505,305,605,410],

roomPicture: "res/303.jpg",
})

new Room({
roomname:"407",

roomPos: [505,415,605,525],

roomPicture: "res/303.jpg",
})

new Room({
roomname:"405",

roomPos: [505,525,605,635],

roomPicture: "res/303.jpg",
})

new Room({
roomname:"403",

roomPos: [505,640,605,745],

roomPicture: "res/303.jpg",
})

new Room({
roomname:"401",

roomPos: [505,750,605,855],

roomPicture: "res/303.jpg",
})

new Room({
roomname:"176",

roomPos: [210,750,325,860],

roomPicture: "res/312.jpg",
})

new Room({
roomname:"174",

roomPos: [20,750,205,860],

roomPicture: "res/312.jpg",
})
]
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
            console.log("saving:")
            console.log(adm);
        }else{
            console.log("not saving");
        }
    });
});


