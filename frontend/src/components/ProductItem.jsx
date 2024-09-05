import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
    return (
        <div className="border p-4">
            <h2 className="text-2xl mb-2">{product.productName}</h2>
            <p className="mb-2">Price: {product.productPrice}</p>
            <p className="mb-2">In Stock: {product.inStock ? 'Yes' : 'No'}</p>
            <Link to={`/products/details/${product._id}`} className="text-blue-500">View Details</Link>
        </div>
    );
};

export default ProductItem;
