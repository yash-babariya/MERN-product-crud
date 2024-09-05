import express from 'express';
import { Product } from '../models/productsModel.js'; // Ensure this path is correct

const router = express.Router();

// Route for saving a new product
router.post("/", async (request, response) => {
    try {
        // Ensure all required fields are provided
        if (
            !request.body.productName ||
            !request.body.productPrice ||
            typeof request.body.inStock === 'undefined'
        ) {
            return response.status(400).send({
                message: "Send all required fields!",
            });
        }

        // Create a new product
        const newProduct = {
            productName: request.body.productName,
            productPrice: request.body.productPrice,
            inStock: request.body.inStock,
        };

        const product = await Product.create(newProduct);

        return response.status(201).send(product);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all products from the db
router.get("/", async (request, response) => {
    try {
        const products = await Product.find({});
        return response.status(200).json({
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting a product from the db by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const product = await Product.findById(id);
        if (!product) {
            return response.status(404).json({ message: "Product not found!" });
        }
        return response.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a product
router.put("/:id", async (request, response) => {
    try {
        // Ensure all required fields are provided
        if (
            !request.body.productName ||
            !request.body.productPrice ||
            typeof request.body.inStock === 'undefined'
        ) {
            return response.status(400).send({
                message: "Send all required fields!",
            });
        }

        const { id } = request.params;

        const result = await Product.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: "Product not found!" });
        }
        return response.status(200).json({ message: "Product updated successfully!" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a product
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Product not found!" });
        }
        return response.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
