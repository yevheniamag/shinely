import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;
const JWT_SECRET = 'your-very-secret-key-12345';
const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas підключено!');
    app.listen(PORT, () => {
      console.log(
        `( ˶ˆ ᗜ ˆ˵ ) MongoDB/Express сервер запущено на http://localhost:${PORT}`
      );
      seedDatabase();
    });
  })
  .catch((err) => console.error('❌ Помилка підключення MongoDB:', err));

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  image: String,
  name: String,
  type: String,
  volume: String,
  filter_hairType: String,
  filter_problem: String,
  description: String,
  howToUse: String,
  benefits: [String],
});
const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  favorites: [String],
});
const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(express.json());

const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('ℹ️ База продуктів вже заповнена. Синхронізацію пропущено.');
    } else {
      const dbPath = path.join(__dirname, '..', 'db.json');
      const rawData = fs.readFileSync(dbPath);
      const data = JSON.parse(rawData);

      if (data.products) {
        await Product.insertMany(data.products);
        console.log('✅ Продукти успішно завантажено в MongoDB.');
      }
    }

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log(
        'ℹ️ База користувачів вже заповнена. Синхронізацію пропущено.'
      );
    } else {
      const dbPath = path.join(__dirname, '..', 'db.json');
      const rawData = fs.readFileSync(dbPath);
      const data = JSON.parse(rawData);

      if (data.users) {
        for (const user of data.users) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          const newUser = new User({
            id: user.id,
            email: user.email,
            password: hashedPassword,
            firstName: user.firstName,
            lastName: user.lastName,
            favorites: user.favorites.map((f) => String(f)),
          });
          await newUser.save();
        }
        console.log('✅ Користувачі успішно завантажені (з хешуванням).');
      }
    }
  } catch (error) {
    console.error('❌ Помилка заповнення бази:', error.message);
  }
};

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: id });

    if (!product) {
      return res.status(404).json({ message: 'Продукт не знайдено' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

app.post('/users/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName) {
    return res
      .status(400)
      .json({ message: "Email, пароль та ім'я є обов'язковими" });
  }

  try {
    const existing = await User.findOne({ email: email });
    if (existing) {
      return res.status(400).json({ message: 'Цей email вже зареєстрований!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = String(Date.now());

    const user = new User({
      id: newUserId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      favorites: [],
    });
    await user.save();

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      token,
      user: { id: user.id, email, firstName, lastName, favorites: [] },
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Неправильний email або пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неправильний email або пароль' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        favorites: user.favorites,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) return res.sendStatus(403);
    req.user = userPayload;
    next();
  });
};

app.patch('/users/favorites', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { favorites } = req.body;

  if (typeof favorites === 'undefined') {
    return res
      .status(400)
      .json({ message: 'Потрібно надіслати поле favorites' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { favorites: favorites },
      { new: true }
    );

    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      favorites: updatedUser.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});
