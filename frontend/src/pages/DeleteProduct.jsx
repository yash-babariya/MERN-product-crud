import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const DeleteProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = () => {
        axios
            .delete(`http://localhost:5353/products/${id}`)
            .then(() => {
                enqueueSnackbar('Product Deleted Successfully', { variant: 'success' });
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                enqueueSnackbar('Error deleting product', { variant: 'error' });
            });
    };

    return (
        <div className="bg-gray-900 min-h-screen p-4">
            <h1 className="text-4xl font-bold text-white mb-8">Delete Product</h1>
            <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
            >
                Delete Product
            </button>
        </div>
    );
};

export default DeleteProduct;
