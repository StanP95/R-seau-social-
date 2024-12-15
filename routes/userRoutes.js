const express = require('express');
const { getUserById, getUser, followUser, unfollowUser } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getUser);
router.post('/:id/follow', protect, followUser);
router.post('/:id/unfollow', protect, unfollowUser);

module.exports = router;
