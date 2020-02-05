const express = require("express");
const Rating = require("../models/rating");
const router = express.Router();

router.route("/")
.post((req,res,next)=>{
    let rating = new Rating(req.body);
    rating.owner = req.user._id;
    console.log(rating);
    rating.save()
    .then((rating)=>
    {res.statusCode = 201;
        res.json(rating);
    }).catch(next);
})

module.exports = router;