require('./config/config');
require('./models/db');
require('./config/passportConfig');
require('dotenv').config();

const path = require('path');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const addressRouter = require('./routes/addressRouter');
const orderRouter = require('./routes/orderRouter');
var authRouter = require('./routes/authRouter');
var adminRouter = require('./routes/adminRouter');
var paymentRouter = require('./routes/paymentRouter');

const passport = require('passport');
// const fastTwoSms = require('fast-two-sms');

mongoose.connect('mongodb://localhost:27017/productMart', { useMongoClient: true });

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/images', express.static(path.join('images')));

app.use('/api', authRouter);
app.use('/api', paymentRouter);
app.use('/admin', adminRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', addressRouter);
app.use('/api', orderRouter);






//error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
})

//SMS

// app.use(express.urlencoded({ extended: false }));

// app.post('/sendMessage', async (req, res) => {
//     const responce = await fastTwoSms.sendMessage({ authorization: process.env.API_KEY, message: req.body.message, numbers: [req.body.number] });
//     res.send(responce);
// })

app.listen(process.env.PORT, () => console.log(`Backend running on port :${process.env.PORT}`))

