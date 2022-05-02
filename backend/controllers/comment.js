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
    const number = req.params.postId;

    // Check required field to valid creation
    if (content === null) {
        return res.status(400).json({
            error: 'Empty input field, comment not added'
        });
    }
    // Identify post to be commented
    models.Post.findOne({ where: { id: req.params.postId } })
        .then(post => {
            console.log('post n°' + number + ' selected for comment');
            if (!post) {  // if can not find post to comment
                return res.status(401).json({ error: 'Post not found in database' });
            }
            // Create comment
            const newComment = models.Comment.create({
                userId: userId, // = id comment owner
                postId: post.id, // to check: done
                content: content
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
};


// ---------- Access to All comments added on post selected : use getAllComments function ----------
exports.getAllComments = (req, res, next) => {

    const User = models.User;

    models.Comment.findAll({
        where: { postId: req.params.postId },
        order: [
            ['updatedAt', 'ASC']
        ],
        include: [ // retrieve information from another table here
            {
                model: User,
                attributes: ['username', 'avatar']
            }]
    })
        .then(comments => {
            console.log(comments);
            res.status(200).json({ comments });
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({ error: 'Retrieval comments failed' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Server error' })
        })
};


// ---------- Delete comment: use deleteComment function ----------
exports.deleteComment = (req, res, next) => {

    const id = req.params.id;

    models.Comment.findByPk(id)
        .then(comment => {
            console.log(comment);
            if (!comment) {  // if can not find comment
                return res.status(401).json({ error: 'Deletion not possible' });
            }
            models.Comment.destroy({ where: { id: id } })
            return res.status(200).json({ message: 'Comment destroyed' })
        })
        .catch(error => res.status(500).json({ error }));
}
