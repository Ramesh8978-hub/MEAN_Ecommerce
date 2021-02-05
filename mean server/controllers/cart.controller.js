const Cart = require('../models/cartShema');

exports.getCartItems = (req, res, next) => {
    Cart.find({}, (err, cartItem) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        }
        res.status(200).json(cartItem);

    })
};
exports.deleteCartItems = (req, res, next) => {
    Cart.findOneAndRemove({ _id: req.params.id }, (err, country) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        }
        res.status(200).json({ msg: country });

    })
};
exports.addToCart = async (req, res) => {
    var cartItem = new Cart();
    cartItem.email = req.body.email;
    cartItem.name = req.body.name;
    cartItem.actualProductPrice = req.body.price;
    cartItem.price = req.body.price;
    cartItem.qty = req.body.qty;
    cartItem.imagePath = req.body.imagePath;
    cartItem.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.send(err);
        }
    });
    
    // Cart.create(req.body, (err, result) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     else {
    //         res.send(result);
    //     }
    // })
};
exports.updataCartItems = (req, res, next) => {
    Cart.findById(req.body._id, (err, cartItem) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        }
        else {
            cartItem.qty = req.body.qty,
            console.log();
            cartItem.price += cartItem.actualProductPrice
            cartItem.save((err, cartItem) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(cartItem)
                }
            })
        }
    })
};

