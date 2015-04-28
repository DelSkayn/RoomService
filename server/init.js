var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RoomService');

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback){
    console.log("Connection to Database created");	
});


var UserSchema = new mongoose.Schema({
	userName: String,
	passWord: String,
	eMail: String,
	isAdmin: Boolean,
})

var User = mongoose.model('User',UserSchema);

var mees = new User({
    userName: 'Skayn',
    passWord: 'LolNo',
    eMail: "yoko.minsky@gmail.com",
    isAdmin: true,
});

function doError(err){
    if (err) {
        console.log("Error happend during user save");
        return handleError(err);
    }
}

mees.save(doError);


