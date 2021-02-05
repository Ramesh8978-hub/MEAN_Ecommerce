const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}


// const mongoose = require('mongoose');
// const passport = require('passport');
// const _ = require('lodash');
// const jwt = require('jsonwebtoken')

// const User = require('../models/userSchema')

// function verifyToken(req, res, next) {
//     if(!req.headers.authorization) {
//       return res.status(401).send('Unauthorized request')
//     }
//     let token = req.headers.authorization.split(' ')[1]
//     if(token === 'null') {
//       return res.status(401).send('Unauthorized request')    
//     }
//     let payload = jwt.verify(token, 'secretKey')
//     if(!payload) {
//       return res.status(401).send('Unauthorized request')    
//     }
//     req.userId = payload.subject
//     next()
//   }


// module.exports.register = (req, res, next) => {
//     var user = new User();
//     user.fullName = req.body.fullName;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.save((err, doc) => {
//         if (!err)
//             res.send(doc);
//         else {
//             if (err.code == 11000)
//                 res.status(422).send(['Duplicate email adrress found.']);
//             else
//                 return next(err);
//         }

//     });
// }

// module.exports.authenticate = (req, res, next) => {
//     let adminData = req.body
//     User.findOne({email: adminData.email}, (err, user) => {
//       if (err) {
//         console.log(err)    
//       } else {
//         if (!user) {
//           res.status(401).send('Invalid Email')
//         } else 
//         if ( user.password !== adminData.password) {
//           res.status(401).send('Invalid Password')
//         } else {
//           let payload = {subject: user._id}
//           let token = jwt.sign(payload, 'secretKey')
//           res.status(200).send({token})
//         }
//       }
//     })
// }

// module.exports.userProfile = (req, res, next) =>{
//     User.findOne({ _id: req._id },
//         (err, user) => {
//             if (!user)
//                 return res.status(404).json({ status: false, message: 'User record not found.' });
//             else
//                 return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
//         }
//     );
// }










