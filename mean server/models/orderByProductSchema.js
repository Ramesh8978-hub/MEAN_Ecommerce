const mongoose = require('mongoose');

const orderByProductSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String  },
    price: { type: String, required: true  },
    qty: { type: String, required: true  },
    imagePath: { type: String, required: true  },
    status: { type: String},
    
});

module.exports = mongoose.model('orderByProduct', orderByProductSchema);
