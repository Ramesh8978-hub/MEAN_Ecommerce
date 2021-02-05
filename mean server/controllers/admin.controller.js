
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminSchema');


  
function verifyJwtToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

module.exports.adminRegister = (req, res, next) => {
    let adminData = req.body
    let admin = new Admin(adminData)
    admin.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
}
module.exports.adminProfile=(req,res,next)=>{
  Admin.find({"email":req.query.email},(err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
      console.log(result);
    }
  })
}



module.exports.adminAuthenticate = (req, res, next) => {
    let adminData = req.body
    Admin.findOne({email: adminData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== adminData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    })
}



// module.exports.adminProfile = (req, res, next) =>{
//     admin.findOne({ _id: req._id },
//         (err, admin) => {
//             if (!admin)
//                 return res.status(404).json({ status: false, message: 'admin record not found.' });
//             else
//                 return res.status(200).json({ status: true, admin : _.pick(admin,['fullName','email']) });
//         }
//     );
// }