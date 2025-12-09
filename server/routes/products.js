import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Продукт не знайдено' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: 'Помилка сервера або невірний ID',
      error: error.message,
    });
  }
});

export default router;
