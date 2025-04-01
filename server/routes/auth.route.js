const express = require('express');
const { signup, login, chat } = require('../controllers/auth.controller');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { googleSignIn } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', loginValidation, login);
router.post('/Signup', signupValidation, signup);

router.post('/google-sign-in', googleSignIn);
// router.post('./chat', chat)

module.exports = router;