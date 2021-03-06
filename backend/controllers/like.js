// Interactivity
// Allow users to like post > choice to not implement dislike (it may can instaure frustration for post owner)

// Import models created 
const models = require('../models');
// Secure API access (->informations<-) -> authentication by token
const jwt = require('jsonwebtoken');
// Authenticate user logged with jwt > allow access to edit his data, access ressources
const jwthandle = require('../middlewares/jwt.handler')
require('dotenv').config()


// ---------- Allow user to like a post: use likePost function ----------
exports.likePost = (req, res, next) => {
    // Authorize user with jwt
    const headers = req.headers['authorization'];
    const userId = jwthandle.getUserId(headers);
    const number = req.params.postId;

    // Identify post
    models.Post.findOne({ where: { id: req.params.postId } })
        .then(post => {
            console.log('post n°' + number + ' found');
            if (!post) {  // if can not find post to like
                return res.status(401).json({ error: 'Post not found in database' });
            }
            // Data entry in likes table
            models.Like.create({
                userId: userId,
                postId: req.params.postId
            })
                .then(() => {
                    console.log('Like system running');
                    // Update likes counter in posts table
                    models.Post.update({
                        likes: post.likes + 1
                    },
                        {
                            where: { id: req.params.postId }
                        })
                })
                .then(() => res.status(201).json({
                    message: 'Post liked by user ' + userId + ' 😆'
                }))
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'Add like failed' })
                })
        })
        .catch(error => res.status(500).json({ error }));

}