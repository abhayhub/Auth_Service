const express = require('express');
const UserController = require('../../controllers/user-controller');
const { AuthRequestValidator } = require('../../middlewares/index');
const router = express.Router();

router.post('/signup', AuthRequestValidator.validateUserAuth , UserController.singup);
router.post('/signin' , AuthRequestValidator.validateUserAuth, UserController.singin);

router.get('/isAuthenticated',UserController.isAuthenticated);

router.get('/isAdmin' , UserController.isAdmin);
module.exports = router;
