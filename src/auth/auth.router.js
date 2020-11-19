const { Router } = require('express');
const { authorize } = require('../helpers/authorize.middleware');
const { validate } = require('../helpers/validate.middleware');
const { signUp, signIn, logout } = require('./auth.controller');
const { loginRegisterSchema } = require('./auth.schema');

const router = Router();

router.post('/register', validate(loginRegisterSchema), signUp);
router.post('/login', validate(loginRegisterSchema), signIn);
router.post('/logout', authorize, logout);

exports.authRouter = router;
