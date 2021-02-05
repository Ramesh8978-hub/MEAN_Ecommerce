const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String},
  description: { type: String },
  qty: { type: String },
  price: { type: String},
  imagePath: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
