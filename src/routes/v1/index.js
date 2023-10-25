const express = require('express');
const UserController = require('../../controllers/user-controller');
const { AuthRequestValidator } = require('../../middlewares/index');
const router = express.Router();

router.post('/signup', AuthRequestValidator.validateUserSingup , UserController.create);
router.post('/signin' , AuthRequestValidator.validateUserSingup, UserController.singin);
module.exports = router;
