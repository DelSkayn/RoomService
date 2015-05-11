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
 	floorId: {type : mongoose.Schema.Types.ObjectId,ref:'floor', required : true},
	roomPos: [Number],
	roomName:{type : String, unique : true, required : true, dropDups : true},
    roomPicture:{type: String, required : true},
});

var Room = mongoose.model('Room', roomSchema);

var ratingRoomSchema = new mongoose.Schema({
	rating: Number,
	userID: {type : mongoose.Schema.Types.ObjectId, required : true},
	roomID: {type : mongoose.Schema.Types.ObjectId,ref:'Room', required : true},
});

var Rating = mongoose.model('RatingRoom', ratingRoomSchema);

var tableSchema = new mongoose.Schema({
	roomPos: String,
	roomID: {type : mongoose.Schema.Types.ObjectId,ref: 'Room', dropDups : true},
});

var Table = mongoose.model('Table',tableSchema);

var commentSchema = new mongoose.Schema({
	userID: {type : mongoose.Schema.Types.ObjectId,ref:'User', dropDups : true},
	dateComment: Date,
	commentText: {type : String, unique: false, required: false, maxlength : 120},
	roomID:{type : mongoose.Schema.Types.ObjectId,ref:'Room' , required : true},
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
            adm.save(doError);
        }else{
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

    var f0ID;
    var f1ID;
    Floor.findOne({floorName: "f0"},function(err,data){
    var roomses;
        console.log("------------------------");
        f0ID = data._id;
        Floor.findOne({floorName: "f1"},function(err,data){
            console.log("the f1 data is");
            console.log(data._id);
            f1ID = data._id;
            console.log("[][][][][][][]");
            console.log(f0ID);
            console.log("f1ID is");
            console.log(f1ID);
            roomses = [
                new Room({
                    roomName:"312",
                    roomPos: [840,18,960,180],
                    roomPicture: "312.png",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"313",
                    roomPos: [970,18,1110,180],
                    roomPicture: "313.png",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"306/308",
                    roomPos: [835,300,940,515],
                    roomPicture: "302.png",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"302/304",
                    roomPos: [835,529,940,740],
                    roomPicture: "302.png",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"309",

                    roomPos: [1000,300,1100,405],

                    roomPicture: "303.png",
                    floorId: f0ID,
                }),

                new Room({
                    roomName:"307",
                    roomPos: [1000,410,1100,515],
                    roomPicture: "303.png",
                    floorId: f0ID,
                }),

                new Room({
                    roomName:"305",
                    roomPos: [1000,520,1100,630],
                    roomPicture: "303.png",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"303",
                    roomPos: [1000,635,1100,740],
                    roomPicture: "303.png",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"301/DLF",
                    roomPos: [1000,750,1100,850],
                    roomPicture: "DLF.jpg",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"B4",
                    roomPos: [10,535,240,650],
                    roomPicture: "B02.png",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"B3",
                    roomPos: [10,655,240,765],
                    roomPicture: "B02.png",
                    floorId: f0ID,
                }),
                new Room({
                    roomName:"B2",
                    roomPos: [10,775,240,885],
                    roomPicture: "B02.png",
                    floorId: f0ID,
                }),

                new Room({
                    roomName:"B1",
                    roomPos: [10,895,225,1005],
                    roomPicture: "B02.png",
                    floorId: f0ID,
                }),
                //--------------------------------
                new Room({
                    roomName:"412",
                    roomPos: [340,20,465,185],
                    roomPicture: "312.png",
                    floorId: f1ID,
                }),
                new Room({
                    roomName:"413",
                    roomPos: [475,20,605,185],
                    roomPicture: "313.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"410",
                    roomPos: [335,190,440,300],
                    roomPicture: "312.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"408",

                    roomPos: [335,305,440,410],

                    roomPicture: "312.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"406",

                    roomPos: [335,415,440,525],

                    roomPicture: "312.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"404",

                    roomPos: [335,525,440,635],

                    roomPicture: "312.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"402",

                    roomPos: [335,640,440,745],

                    roomPicture: "312.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"411",

                    roomPos: [505,190,605,300],

                    roomPicture: "303.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"409",

                    roomPos: [505,305,605,410],

                    roomPicture: "303.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"407",
                    roomPos: [505,415,605,525],
                    roomPicture: "303.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"405",
                    roomPos: [505,525,605,635],
                    roomPicture: "303.png",
                    floorId: f1ID,
                }),

                new Room({
                    roomName:"403",
                    roomPos: [505,640,605,745],
                    roomPicture: "303.png",
                    floorId: f1ID,
                }),
                new Room({
                    roomName:"401",
                    roomPos: [505,750,605,855],
                    roomPicture: "303.png",
                    floorId: f1ID,
                }),
                new Room({
                    roomName:"176",
                    roomPos: [210,750,325,860],
                    roomPicture: "312.png",
                    floorId: f1ID,
                }),
                new Room({
                    roomName:"174",
                    roomPos: [20,750,205,860],
                    roomPicture: "312.png",
                    floorId: f1ID,
                })];

        roomses.forEach(function(adm){
            Room.findOne(adm,function(err,res){
                console.log(res);
                if (res) {
                    console.log("not saving");
                }else{
                    adm.save();
                    console.log("saving:")
                    console.log(adm);
                }
            }
        )});
    });
});


