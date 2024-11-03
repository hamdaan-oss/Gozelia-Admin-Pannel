import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
import productsRouter from './routes/productsRoutes.js';
import couponRouter from './routes/couponRoutes.js'; // Adjusted this to match your coupon route file
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import fulfilledOrdersRoutes from './routes/fulfilledOrders.js'; 


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/coupons', couponRouter); // Ensure you are using the correct router for coupons
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/fulfill', fulfilledOrdersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('MongoDB URI not found. Please check your .env file.');
    process.exit(1);
}

// Connect to MongoDB and start server
mongoose.connect(mongoURI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the application on error
    });

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
});
