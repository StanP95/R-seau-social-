const express = require('express');
const { createPost, getPosts, likePost } = require('../controllers/postControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getPosts);
router.post('/:id/like', protect, likePost);

module.exports = router;
