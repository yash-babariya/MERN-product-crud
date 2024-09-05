import React from 'react';

const ProductCard = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-gray-800 text-gray-200 border border-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                    <h2 className="text-2xl font-semibold mb-2">{product.productName}</h2>
                    <p className="text-lg mb-2">Price: <span className="font-semibold">${product.productPrice}</span></p>
                    <p className="text-lg mb-2">In Stock: <span className={`font-semibold ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>{product.inStock ? 'Yes' : 'No'}</span></p>
                    <p className="text-lg mb-2">Created At: <span className="font-semibold">{new Date(product.createdAt).toLocaleString()}</span></p>
                    <p className="text-lg mb-2">Updated At: <span className="font-semibold">{new Date(product.updatedAt).toLocaleString()}</span></p>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;
