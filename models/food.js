const mongoose = require("mongoose");

const Order = mongoose.model("orders", {
    foodImageName:{
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

module.exports = Order;