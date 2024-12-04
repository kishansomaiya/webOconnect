const express = require('express');
const { createPost, getPosts, likePost } = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createPost);
router.get('/', authenticateToken, getPosts);
router.post('/:id/like', authenticateToken, likePost);

module.exports = router;
