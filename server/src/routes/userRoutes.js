const express = require('express');
const { registerUser, loginUser, followUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/:id/follow', authenticateToken, followUser);

module.exports = router;
