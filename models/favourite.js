const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema( {
    foodName:{
        type:String
    },
    foodPrice:{
        type:String
    },
    foodCategory:{
        type:String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
module.exports = mongoose.model("FavouriteList", favouriteSchema);