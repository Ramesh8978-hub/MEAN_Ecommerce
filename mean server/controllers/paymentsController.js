const Payment = require('../models/paymentSchema');

exports.getPayment = (req, res, next) => {
    Payment.find({}, (err, result) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        }
        res.status(200).json(result);

    })
};
exports.addPayment = async (req, res) => {
    Payment.create(req.body, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
};
exports.deletePayment = async (req, res) => {
    Payment.findOneAndRemove({_id:req.params.id},(err,result)=>{
        if (err) {
            res.send(err); 
        }
        else {
            res.send(result);
        }
    })
};
exports.updataPayment = async (req, res) => {
    Payment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
        if (err) {
          res.send(err);
        }
        else {
          res.send(result);
        }
      })
};


