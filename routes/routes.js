const express = require('express');
const { register, login } = require('../controller/auth_controller');
const { userlist } = require('../controller/users_controller');
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/userslist', userlist)




module.exports = router;