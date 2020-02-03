const express = require('express');
const Order = require("../models/order");
const auth = require('../auth');
const router = express.Router();

router.route("/", auth.verifyAdmin)
.get((req, res, next) => {
    Order.find()
        .then((order) => {
            console.log(order);
            res.json(order);
        })
        .catch((err) => {
            next(err)
        })
    })
    .post((req, res, next) => {
        let order = new Order(req.body);
        console.log(order);
        order.save()
            .then((order) => {
                res.statusCode = 201;
                res.json(order);
            }).catch(next)
    })
module.exports = router;