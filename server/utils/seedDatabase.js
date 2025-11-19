import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('База продуктів вже заповнена. Синхронізацію пропущено.');
    } else {
      const dbPath = path.join(process.cwd(), '..', 'db.json');

      if (fs.existsSync(dbPath)) {
        const rawData = fs.readFileSync(dbPath);
        const data = JSON.parse(rawData);

        if (data.products) {
          await Product.insertMany(data.products);
          console.log('Продукти успішно завантажено в MongoDB.');
        }
      } else {
        console.log('db.json не знайдено, пропускаємо seed.');
      }
    }

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('База користувачів вже заповнена. Синхронізацію пропущено.');
    } else {
      const dbPath = path.join(process.cwd(), '..', 'db.json');
      if (fs.existsSync(dbPath)) {
        const rawData = fs.readFileSync(dbPath);
        const data = JSON.parse(rawData);

        if (data.users) {
          for (const user of data.users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = new User({
              ...user,
              password: hashedPassword,
              favorites: user.favorites.map((f) => String(f)),
            });
            await newUser.save();
          }
          console.log('Користувачі успішно завантажені (з хешуванням).');
        }
      }
    }
  } catch (error) {
    console.error('Помилка заповнення бази:', error.message);
  }
};
