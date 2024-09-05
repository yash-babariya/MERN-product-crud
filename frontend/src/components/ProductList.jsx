import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem.jsx';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data.data));
    }, []);

    return (
        <div>
            <h1 className="text-3xl mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
