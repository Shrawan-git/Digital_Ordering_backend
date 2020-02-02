const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Order = require("../models/food.js");
const router = express.Router();
const auth = require('../auth');
const multer = require('multer');
const path = require("path");

router.route("/")
.post((req,res,next) => {
let order = new Order(req.body);
console.log(order);
order.save()
.then((order) => {
    res.statusCode = 201;
    res.json(order);
}).catch(next)
});


router.get('/getOrder', function(req, res){
    Menu.find().then(function(menu){
    res.send(menu);
    }).catch(function(e){
     res.send(e)
    });
    });

module.exports = router;