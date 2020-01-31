const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Order = require("../models/food.js");
const router = express.Router();
const auth = require('../auth');



router.post('/order', function (req, res) {
    var orderedFood = new Order(req.body);
    orderedFood.save().then(function (){
        res.send('Food ordered');
    }).catch(function(e){

    });
    console.log(req.body);
});

module.exports = router;