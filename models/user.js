var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//adds in auth data for user and pass
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);