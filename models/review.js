
const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
});

module.exports = mongoose.model('review', ReviewSchema);
