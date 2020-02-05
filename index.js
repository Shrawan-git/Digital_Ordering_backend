const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const uploadRouter = require('./routes/upload');
const orderRouter = require('./routes/order');
const orderedRouter = require('./routes/userorder');
const ratingRouter = require('./routes/rating');
const auth = require('./auth');

const app = express();
app.options('*', cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(__dirname+"/public"));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));
    
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);
app.use(auth.verifyUser);
app.use('/order', orderRouter);
app.use('/userorder', orderedRouter);
app.use('/rating', ratingRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});
