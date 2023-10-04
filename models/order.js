const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('order', OrderSchema);
