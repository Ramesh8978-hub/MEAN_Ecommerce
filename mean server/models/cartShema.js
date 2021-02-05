const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name: { type: String, required: true},
    actualProductPrice: { type: Number, required: true  },
    email: { type: String  },
    price: { type: Number, required: true  },
    qty: { type: Number, required: true  },
    imagePath: { type: String, required: true  },
});

module.exports = mongoose.model('Cart', cartSchema);
