const express = require('express');
const Order = require("../models/userorder");
const router = express.Router();
router.route("/")

.post((req, res, next) => {
    let ordered = new Ordered(req.body);
    ordered.owner = req.user._id;
    console.log(ordered);
    ordered.save()
        .then((ordered) => {
            res.statusCode = 201;
            res.json(ordered);
        }).catch(next)
})
module.exports = router;