const express = require('express');
const Order = require("../models/order");
const router = express.Router();
router.route("/")
    .post((req, res, next) => {
        let order = new Order(req.body);
        order.owner = req.user._id;
        console.log(order);
        order.save()
            .then((order) => {
                res.statusCode = 201;
                res.json(order);
            }).catch(next)
    })
module.exports = router;