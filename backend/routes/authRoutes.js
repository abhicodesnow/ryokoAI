// backend/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// The routes for user authentication
router.post('/register', register);
router.post('/login', login);

module.exports = router;