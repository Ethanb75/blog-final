var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            //model we will refer to
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);