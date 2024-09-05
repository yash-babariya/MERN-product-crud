import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoute from './routes/productsRoute.js'; // Correct path
import { PORT, mongoDBURL } from './config.js'; // Correct path

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Define routes
app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send('Welcome to MERN Stack Project'); // Changed status code to 200
});

app.use('/products', productRoute);

// Connect to MongoDB and start the server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to db');
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
