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
})

var User = mongoose.model('User',UserSchema);

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


