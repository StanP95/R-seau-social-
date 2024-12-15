const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
    const token = req.header('Authorization');
    const extractedToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });


    try {
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
