const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

console.log('authRoutes loaded'); 

router.post('/register', register);
router.post('/login', login);

module.exports = router;