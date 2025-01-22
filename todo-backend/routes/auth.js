const express = require('express');
const authController = require('../controllers/auth');

const authRoutes = express.Router();

authRoutes.use('/auth', authController);

module.exports = authRoutes;