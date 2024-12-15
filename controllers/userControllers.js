const User = require('../models/user');

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers following');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.find().populate('followers following');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToFollow.followers.includes(req.user.id)) {
            userToFollow.followers.push(req.user.id);
            currentUser.following.push(req.params.id);
            await userToFollow.save();
            await currentUser.save();
            res.json({ message: 'User followed successfully' });
        } else {
            res.status(400).json({ error: 'You already follow this user' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        userToUnfollow.followers = userToUnfollow.followers.filter(
            (id) => id.toString() !== req.user.id
        );
        currentUser.following = currentUser.following.filter(
            (id) => id.toString() !== req.params.id
        );
        await userToUnfollow.save();
        await currentUser.save();
        res.json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
