import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner'; // Import Spinner component

const ShowProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5353/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            {loading ? (
                <div className="flex items-center justify-center">
                    <Spinner />
                </div>
            ) : error ? (
                <div className="text-lg text-red-500">{error}</div>
            ) : !product ? (
                <div className="text-lg text-gray-400">Product not found</div>
            ) : (
                <div className="p-8 max-w-lg w-full bg-gray-800 shadow-md rounded-lg border border-gray-700">
                    <h1 className="text-4xl font-bold mb-6 text-cyan-400 text-center">{product.productName}</h1>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-300">Price:</p>
                        <p className="text-2xl font-bold text-green-400">${product.productPrice}</p>
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-300">In Stock:</p>
                        <p className={`text-2xl font-bold ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                            {product.inStock ? 'Yes' : 'No'}
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-300">Created At:</p>
                        <p className="text-lg text-red-400">
                            {new Date(product.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-300">Updated At:</p>
                        <p className="text-lg text-red-400">
                            {new Date(product.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowProduct;
