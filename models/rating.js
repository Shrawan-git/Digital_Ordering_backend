const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    rate:{
        type:String
    },
    feedback:{
        type: String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports = mongoose.model("rating", ratingSchema);