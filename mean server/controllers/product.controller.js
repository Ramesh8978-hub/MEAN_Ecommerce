const Product = require('../models/productSchema');

exports.getproducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
};

exports.postproduct = async (req, res) => {
  const { name } = req.body;
  const { description } = req.body;
  const { qty } = req.body;
  const { price } = req.body;
  const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
  const product = new Product({
    name,
    description,
    qty,
    price,
    imagePath,
  });
  const createdproduct = await product.save();
  res.status(201).json({
    product: {
      ...createdproduct._doc,
    },
  });
};

exports.editProduct =(req,res)=>{
  Product.findById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
}

exports.updateProduct = async (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
};

exports.deleteProduct = (req, res, next) => {
  Product.findOneAndRemove({ _id: req.params.id }, (err, country) => {
      if (err) {
          res.status(500).json({ errmsg: err });
      }
      res.status(200).json({ msg: country });

  })
};

