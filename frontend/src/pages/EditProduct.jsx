import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner'; // Import Spinner component

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5353/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Error fetching product details', { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, enqueueSnackbar]);

    const handleEdit = async (updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5353/products/${id}`, updatedData);
            console.log('Product updated:', response.data);
            enqueueSnackbar('Product Updated Successfully', { variant: 'success' });
            navigate("/");
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error updating product', { variant: 'error' });
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen p-4">
            <h1 className="text-4xl font-bold text-white mb-8">Edit Product</h1>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner />
                </div>
            ) : (
                product && <ProductForm onSubmit={handleEdit} initialData={product} />
            )}
        </div>
    );
};

export default EditProduct;
