const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!');
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            image: req.body.image,
            gender: req.body.gender
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    console.log(req.body)
    User.findOne({ name: req.body.name })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me', auth.verifyUser, (req, res, next) => {
    console.log(req.user.image);
    res.json({ _id: req.user._id, name: req.user.name, email:req.user.email, phone:req.user.phone, image: req.user.image, gender:req.user.gender});
});

router.put('/UserUpdateAndroid', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: user._id, name: user.name, email: user.email, phone: user.phone, image: user.image });
        }).catch(next);
});
// router.put('/UserUpdateAndroid/:id', function (req, res, next) {
//     User.update({
//         name: req.body.name,
//         email: req.body.email,
//         gender: req.body.gender
//     },{
//         where:{
//             id: req.params.id
//         }
//     }).then(function (result){
//         if(result === 0){
//             res.json({
//                 status : 404,
//                 message: "User not fuoound"


//             })
//         }else{
//             res.json({
//                 status:200,
//                 message: "User updated"
//             })
//         }
//     }).catch(function(err){
//         console.log(err)
//     })
// })
//     console.log(req.body);
//     //var uid = req.body._id;
//     User.findOne({ name: req.body.name }, req.body)
//         .then((user) => {
//     // User.findByIdAndUpdate({ _id: uid }, req.body).then(function () {
//         console.log("User Profile Updated Successfully");
//         res.send()
//         console.log(req.body)
//     }).catch(function (e) {
//         console.log("An Error Occured")
//     })
// })
module.exports = router;
