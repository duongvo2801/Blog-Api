const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    price: { type: mongoose.Schema.Types.Mixed, required: true },  // Accept both string and number
    // image: { type: mongoose.Schema.Types.Mixed, required: true },
    image: { type: Buffer, required: true },
    description: { type: String, required: false }
    
});
ProductSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

ProductSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('product', ProductSchema);
