import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const ProductTable = ({ products, onProductDeleted }) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = (productId) => {
        axios
            .delete(`http://localhost:5353/products/${productId}`)
            .then(() => {
                enqueueSnackbar('Product Deleted Successfully', { variant: 'success' });
                onProductDeleted(productId);
            })
            .catch((error) => {
                console.error(error);
                enqueueSnackbar('Error deleting product', { variant: 'error' });
            });
    };

    return (
        <div>
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products available.</p>
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">No</th>
                            <th className="border border-slate-600 rounded-md">Name</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Price</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">In Stock</th>
                            <th className="border border-slate-600 rounded-md">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {product.productName}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                    {product.productPrice}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                    {product.inStock ? 'Yes' : 'No'}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/products/details/${product._id}`}>
                                            <BsInfoCircle className="text-2xl text-green-600" />
                                        </Link>
                                        <Link to={`/products/edit/${product._id}`}>
                                            <AiOutlineEdit className="text-2xl text-yellow-600" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-2xl text-red-600"
                                        >
                                            <MdOutlineDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductTable;
