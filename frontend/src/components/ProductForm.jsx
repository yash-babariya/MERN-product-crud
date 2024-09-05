import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData = {} }) => {
    const [productName, setProductName] = useState(initialData.productName || '');
    const [productPrice, setProductPrice] = useState(initialData.productPrice || '');
    const [inStock, setInStock] = useState(initialData.inStock || false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ productName, productPrice, inStock });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Product Form</h2>
                <div className="mb-4">
                    <label className="block text-xl text-gray-400 mb-2">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        placeholder="Enter product name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-xl text-gray-400 mb-2">Product Price</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        placeholder="Enter product price"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-xl text-gray-400">In Stock</label>
                </div>
                <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
