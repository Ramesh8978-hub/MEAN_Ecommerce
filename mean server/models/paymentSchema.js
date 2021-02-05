const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true  },
    bankName: { type: String, required: true  },
    cardType: { type: String, required: true  },
    cardNumber: { type: Number, required: true  },
    cvv: { type: Number, required: true  },

});

module.exports = mongoose.model('Payment', paymentSchema);
