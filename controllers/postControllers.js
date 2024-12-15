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

// Mise à jour d'un post existant
exports.updatedPost =  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId.toString() === req.body.userId) {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedPost);
      } else {
        res.status(403).json({ message: "Vous ne pouvez modifier que vos propres posts." });
      }
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la mise à jour.", error: err.message });
    }
  };
  
  // Suppression d'un post existant
  exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId.toString() === req.body.userId) {
        await post.deleteOne();
        res.status(200).json({ message: "Post supprimé avec succès." });
      } else {
        res.status(403).json({ message: "Vous ne pouvez supprimer que vos propres posts." });
      }
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la suppression.", error: err.message });
    }
  };
