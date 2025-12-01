import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/register', async (req, res) => {
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

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      favorites: [],
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        email,
        firstName,
        lastName,
        favorites: [],
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: 'Неправильний email або пароль' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Неправильний email або пароль' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({
      token,
      user: {
        _id: user._id,
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

router.patch('/favorites', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { favorites } = req.body;

  if (typeof favorites === 'undefined') {
    return res
      .status(400)
      .json({ message: 'Потрібно надіслати поле favorites' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { favorites: favorites },
      { new: true }
    );

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      favorites: updatedUser.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
});

export default router;
