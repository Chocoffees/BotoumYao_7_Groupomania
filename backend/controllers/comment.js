// Allow users to access comments

// Import models created 
const models = require('../models');
// Secure API access (->informations<-) -> authentication by token
const jwt = require('jsonwebtoken');
// Authenticate user logged with jwt > allow access to edit his data, access ressources
const jwthandle = require('../middlewares/jwt.handler')
require('dotenv').config()


// ---------- Allow user to comment a post: use createComment function ----------
exports.createComment = (req, res, next) => {
    // Authorize user with jwt
    const headers = req.headers['authorization'];
    const userId = jwthandle.getUserId(headers);
    // Define params (= table comments)
    const content = req.body.content;
    
    
    // Check required field to valid creation
    if (content === null) {
        return res.status(400).json({
            error: 'Empty input field, comment not added'
        });
    }

    // Identify comment owner
    models.User.findByPk(userId)
        .then(user => {
            console.log(user);
            if (!user) {  // if can not find user
                return res.status(401).json({ error: 'User not found in database' });
            }

            const newComment = models.Comment.create({
                //userId: user.id, // = id comment owner
                //postId: models.Post.findAll({ where: {'id':id} }), // to check
                content: content,
            })
                .then(() => res.status(201).json({
                    message: 'Comment created',
                    userId
                }))
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'Creation failed' })
                })
                .catch(error => {
                    console.log(error)
                    res.status(500).json({ error: 'Server error' })
                })

        })
}