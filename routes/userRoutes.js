const express = require('express');
const { getUser, followUser, unfollowUser } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:id', getUser);
router.post('/:id/follow', protect, followUser);
router.post('/:id/unfollow', protect, unfollowUser);

module.exports = router;
