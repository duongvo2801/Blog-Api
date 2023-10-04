const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model('orderDetail', OrderDetailSchema);
