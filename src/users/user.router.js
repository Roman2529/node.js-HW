const { Router } = require('express');
const { authorize } = require('../helpers/authorize.middleware');
const { getCurrentUser } = require('./user.controller');

const router = Router();

router.get('/current', authorize, getCurrentUser);

exports.userRouter = router;
