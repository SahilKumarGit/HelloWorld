const express = require('express');
const router = express.Router();
const authorize = require('../Middleware/auth')
const strongAuth = require('../Middleware/strong-auth')
const allCollection = require('../controllers/all')

router.post('/users', allCollection.registration)
router.post('/login', allCollection.login)
router.get('/users/:userId', authorize, allCollection.users)
router.put('/users/:userId', authorize, strongAuth, allCollection.userUpdate)
router.delete('/users/:userId', authorize, strongAuth, allCollection.userDelete)

module.exports = router;