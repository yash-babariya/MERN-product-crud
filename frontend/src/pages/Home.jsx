import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from '../components/home/ProductTable';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import ProductCard from '../components/home/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5353/products')
            .then(response => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                enqueueSnackbar('Error fetching products', { variant: 'error' });
                setLoading(false);
            });
    }, []);

    const handleProductDeleted = (deletedProductId) => {
        setProducts(products.filter(product => product._id !== deletedProductId));
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen p-4 transition-colors duration-300">
            <div className="flex justify-center items-center gap-x-4 mb-6">
                <button
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">Products List</h1>
                <Link to="/products/create">
                    <MdOutlineAddBox className="text-sky-500 text-4xl hover:text-sky-400 transition-colors duration-300" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <ProductTable products={products} onProductDeleted={handleProductDeleted} />
            ) : (
                <ProductCard products={products} />
            )}
        </div>
    );
};

export default Home;
