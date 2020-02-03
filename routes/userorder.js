const express = require('express');
const Userorder = require("../models/userorder");
const router = express.Router();
router.route("/")

.post((req, res, next) => {
    let userorder = new Userorder(req.body);
    userorder.owner = req.user._id;
    console.log(userorder);
    userorder.save()
        .then((userorder) => {
            res.statusCode = 201;
            res.json(userorder);
        }).catch(next)
})
module.exports = router;