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

    router.route("/:foodName")
    .delete((req,res,next) => {
        Favourite.findOneAndDelete({ owner: req.user._id, foodName:req.params.foodName})
        .then((favourite) => {
            if( favourite == null) throw new Error("Product not found");
            res.json(favourite);
        })
    })
module.exports = router;