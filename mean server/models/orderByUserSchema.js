const mongoose = require('mongoose');

const orderByUserSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true  },
    mobile: { type: String, required: true  },
    paymentStatus: { type: String },
    address: { type: String, required: true  },
    city: { type: String, required: true  },
    state: { type: String, required: true  },

});

module.exports = mongoose.model('orderByUser', orderByUserSchema);
