const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log('Получен токен:', token); 

    if (!token) {
        console.warn('Ошибка аутентификации: Токен отсутствует'); 
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Ошибка аутентификации: Неверный токен', err);
            return res.sendStatus(403); // Forbidden
        }
        
        req.user = user; 
        console.log('Аутентификация успешна для пользователя:', user);
        next(); 
    });
};

module.exports = authenticateToken;