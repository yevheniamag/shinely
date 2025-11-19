import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedDatabase } from './utils/seedDatabase.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas підключено!');
    app.listen(PORT, () => {
      console.log(`( ˶ˆ ᗜ ˆ˵ ) Сервер працює на http://localhost:${PORT}`);
      seedDatabase();
    });
  })
  .catch((err) => console.error('Помилка підключення MongoDB:', err));
