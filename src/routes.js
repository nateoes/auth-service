const express = require('express');
const { registerUser, loginUser } = require('./controllers');

const router = express.Router();

// Registro de usuario
router.post('/register', registerUser);

router.get('/ping', (req, res) => {
  res.send('🏓 Pong desde Auth Service');
});


// Login de usuario
router.post('/login', loginUser);

module.exports = router;