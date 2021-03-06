const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports = (req, res, next,id) => {
    Post.findById(id)
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name role')
    .select('_id title body created likes comments photo')
    .exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: err
            });
        }
        req.post = post;
        next();
    });
}