const express = require('express');
const { userVerify, userLogin, userlogout } = require('../controllers/authController');
const { checkLogin } = require('../midlleware/checkLogin');
const router = express.Router();

router.post('/login', userLogin);
router.post('/verify', checkLogin, userVerify);
router.post('/logout', userlogout);

module.exports = router