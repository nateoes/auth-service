const express = require('express');
const { registerUser, loginUser } = require('./controllers');

const router = express.Router();

// Registro de usuario
router.post('/register', registerUser);

// Login de usuario
router.post('/login', loginUser);

module.exports = router;