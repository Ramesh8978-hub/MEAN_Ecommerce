const OrderByUser = require('../models/orderByUserSchema');
const OrderByProduct = require('../models/orderByProductSchema');


exports.getOrderByUser = (req, res, next) => {
    OrderByUser.find({}, (err, result) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        }
        res.status(200).json(result);

    })
};
exports.placeOrderByUser = async (req, res) => {
    OrderByUser.create(req.body, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
    // var orderByUser = new OrderByUser();
    // orderByUser.email = req.body.email;
    // orderByUser.name = req.body.name;
    // orderByUser.mobile = req.body.mobile;
    // orderByUser.paymentStatus = "Successfull";
    // orderByUser.address = req.body.address;
    // orderByUser.city = req.body.city;
    // orderByUser.state = req.body.state;
    // orderByUser.save((err, doc) => {
    //     if (!err)
    //         res.send(doc);
    //     else {
    //         res.send(err);
    //     }
    // });
};



exports.getOrderByProduct = (req, res, next) => {
    OrderByProduct.find({}, (err, result) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        }
        res.status(200).json(result);

    })
};
exports.placeOrderByProduct = async (req, res) => {
    // OrderByProduct.create(req.body, (err, result) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     else {
    //         res.send(result);
    //     }
    // })
    var orderByProduct = new OrderByProduct();
    orderByProduct.email = req.body.email;
    orderByProduct.name = req.body.name;
    orderByProduct.price = req.body.price;
    orderByProduct.qty = req.body.qty;
    orderByProduct.imagePath = req.body.imagePath;
    orderByProduct.status = "order pending";
    orderByProduct.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.send(err);
        }
    });
};
exports.deleteOrderByProduct = async (req, res) => {
    OrderByProduct.findOneAndRemove({_id:req.params.id},(err,result)=>{
        if (err) {
            res.send(err); 
        }
        else {
            res.send(result);
        }
    })
};
exports.updateOrderByProduct = async (req, res) => {
    OrderByProduct.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
      if (err) {
        res.send(err);
      }
      else {
        res.send(result);
      }
    })
  };



