const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded');
    }
    else {
        console.log('Error in MongoDB Connection: ' + JSON.stringify(err, undefined, 2));
    }
})
require('./adminSchema');
require('./userSchema');
require('./productSchema');
require('./cartShema');
require('./addressSchema');
require('./orderByUserSchema');
require('./orderByProductSchema');
require('./paymentSchema');


