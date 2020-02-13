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


.get((req, res, next) => {
    Rating.find()
        .then((rating) => {
            console.log(rating);
            res.json(rating);
        })
        .catch((err) => {
            next(err)
        });
    })

    router.route("/:id")
    .delete((req, res, next) => {
        console.log(req.body);
        Rating.findOneAndDelete({ _id: req.params.id })
        .then((rating) => {
            if(rating == null) throw new Error("Product not found");
            res.json(rating)
        }).catch(next);
    
    })

module.exports = router;