const express = require('express')
const router = express.Router();
const userController = require('../user/user.controller');
const checkAuth = require("../middleware/check-auth");

router.post('/signIn', userController.user_signUp);

router.get('/logIn',  userController.user_logIn);

router.delete('/deleteUser/:id', checkAuth, userController.user_delete);

router.patch('/updateUser/:id', checkAuth, userController.user_update);

router.get('/viewUser', userController.user_getAll);

module.exports = router;
