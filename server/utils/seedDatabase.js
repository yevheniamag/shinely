import fs from 'fs';
import path from 'path';
import Product from '../models/Product.js';
import User from '../models/User.js';

const __dirname = path.resolve();

export const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('ℹ База продуктів вже заповнена.');
    } else {
      const dbPath = path.join(__dirname, '..', 'db.json');
      if (fs.existsSync(dbPath)) {
        const rawData = fs.readFileSync(dbPath);
        const data = JSON.parse(rawData);

        if (data.products) {
          const productsToSave = data.products.map((product) => {
            const { id: _ID, ...rest } = product;
            return rest;
          });

          await Product.insertMany(productsToSave);
          console.log('Продукти успішно завантажено (з новими _id).');
        }
      }
    }
  } catch (error) {
    console.error('Помилка заповнення бази:', error.message);
  }
};
