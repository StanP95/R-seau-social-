const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({ content: req.body.content, author: req.user.id });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author likes');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id);
            await post.save();
            res.json({ message: 'Post liked successfully' });
        } else {
            res.status(400).json({ error: 'You already liked this post' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
