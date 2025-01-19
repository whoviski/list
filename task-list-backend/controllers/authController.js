const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;

    console.log('Регистрация пользователя:', { username }); 

    if (!username || !password) {
        console.warn('Ошибка регистрации: Имя пользователя и пароль обязательны'); 
        return res.status(400).json({ message: 'Имя пользователя и пароль обязательны' });
    }

    try {
        const existingUser  = await User.findOne({ where: { username } });
        if (existingUser ) {
            console.warn('Ошибка регистрации: Пользователь с таким именем уже существует'); 
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = await User.create({ username, password: hashedPassword });

        console.log('Пользователь зарегистрирован:', { userId: newUser .id }); 
        res.status(201).json({ message: 'Пользователь зарегистрирован', userId: newUser .id });
    } catch (error) {
        console.error('Ошибка регистрации:', error); 
        res.status(500).json({ message: 'Ошибка регистрации' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    console.log('Попытка входа пользователя:', { username }); 

    if (!username || !password) {
        console.warn('Ошибка входа: Имя пользователя и пароль обязательны'); 
        return res.status(400).json({ message: 'Имя пользователя и пароль обязательны' });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.warn('Ошибка входа: Пользователь не найден'); 
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn('Ошибка входа: Неверный пароль'); 
            return res.status(401).json({ message: 'Неверный пароль' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Пользователь вошел в систему:', { userId: user.id }); 
        res.json({ token });
    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({ message: 'Ошибка входа' });
    }
};

module.exports = { register, login };