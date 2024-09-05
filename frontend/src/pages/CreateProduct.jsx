import React, { useState } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleCreate = (productData) => {
        setLoading(true);
        axios
            .post('http://localhost:5353/products', productData)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Product Created Successfully', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error creating product', { variant: 'error' });
                console.error(error);
            });
    };

    return (
        <div className="bg-gray-900 min-h-screen p-4">
            <h1 className="text-4xl font-bold text-white mb-8">Create a New Product</h1>
            <ProductForm onSubmit={handleCreate} />
        </div>
    );
};

export default CreateProduct;
