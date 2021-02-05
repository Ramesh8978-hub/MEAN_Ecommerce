const Address = require('../models/addressSchema');

exports.getAddress = (req, res, next) => {
    Address.find({}, (err, address) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        }
        res.status(200).json(address);

    })
};
exports.addAddress = async (req, res) => {
    Address.create(req.body, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
};
exports.deleteAddress = async (req, res) => {
    Address.findOneAndRemove({_id:req.params.id},(err,result)=>{
        if (err) {
            res.send(err); 
        }
        else {
            res.send(result);
        }
    })
};
exports.updataAddress = async (req, res) => {
    Address.findById(req.body._id, (err, address) => {
        if (err){
            res.status(500).json({ errmsg: err });
        }
        else{
            address.name = req.body.name,
            address.email = req.body.email,
            address.mobile = req.body.mobile,
            address.address = req.body.address,
            address.city = req.body.city,
            address.state = req.body.state,

            address.save((err, result) => {
                if (err) {
                }
                else {
                    res.send(result);  
                }
            })
        }
    })
};


