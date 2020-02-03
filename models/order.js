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
    foodDescription:{
        type:String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});
module.exports = mongoose.model("Orders", orderSchema);