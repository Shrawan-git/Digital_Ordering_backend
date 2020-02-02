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
    }
});

module.exports = mongoose.model("orders", orderSchema);