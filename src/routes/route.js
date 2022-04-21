const express = require('express');
const router = express.Router();
const authorize = require('../Middleware/auth')
const allCollection = require('../controllers/all')

router.post('/users', allCollection.registration)
router.post('/login', allCollection.login)
router.get('/users/:userId', authorize, allCollection.users)
router.put('/users/:userId', authorize, allCollection.userUpdate)
router.delete('/users/:userId', authorize, allCollection.userDelete)

module.exports = router;