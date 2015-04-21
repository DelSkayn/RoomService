var mongoose = require('mongoose');
mongoose.connect();

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback){
	
});

var loginSchema = mongoose.Schema({
	userName: String
	passWord: String
	eMail: String
	isAdmin:(bool)
	userId:(objectid)
})

var