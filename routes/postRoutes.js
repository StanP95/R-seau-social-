const express = require('express');
const { createPost, getPosts, likePost, deletePost, updatedPost} = require('../controllers/postControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);
router.put('/:id', protect, updatedPost)
router.get('/', getPosts);
router.post('/:id/like', protect, likePost);

module.exports = router;
