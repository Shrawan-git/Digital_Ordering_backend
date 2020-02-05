const express = require('express');
const Favourite = require("../models/favourite");
const auth = require('../auth');
const router = express.Router();
router.route("/")

.post((req, res, next) => {
    let favourite = new Favourite(req.body);
    favourite.owner = req.user._id;
    console.log(favourite);
    favourite.save()
        .then((favourite) => {
            res.statusCode = 201;
            res.json(favourite);
        }).catch(next)
})

.get((req, res, next) => {
    Favourite.find({ owner: req.user._id})
        .then((favourite) => {
            console.log(favourite);
            res.json(favourite);
        })
        .catch((err) => {
            next(err)
        });
    })
module.exports = router;