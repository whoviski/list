const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authController = express.Router();

authController.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
  
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Пользователь зарегистрирован успешно' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка регистрации пользователя' });
  }
});
authController.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Неверное имя пользователя или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверное имя пользователя или пароль' });
    }

   
    return res.status(200).json({ message: 'Успешный вход' });
  } catch (error) {
    next({ status: 500, message: 'Ошибка входа' });
  }
});
module.exports = authController;