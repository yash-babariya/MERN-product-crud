import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});

export const Product = mongoose.model('Product', productSchema);
