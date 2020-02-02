const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema( {
    image:{
        type:String
    },
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
module.exports = mongoose.model("Orders", orderSchema);