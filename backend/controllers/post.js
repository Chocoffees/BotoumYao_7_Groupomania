// Allow users to access posts

// Import models created 
const models = require('../models');
// Secure API access (->informations<-) -> authentication by token
const jwt = require('jsonwebtoken');
// Authenticate user logged with jwt > allow access to edit his data, access ressources
const jwthandle = require('../middlewares/jwt.handler')
require('dotenv').config()
// Import fs module > interact with file system
const fs = require('fs');


// ---------- Allow user to create a post: use createPost function ----------
exports.createPost = (req, res, next) => {
    // Authorize user with jwt
    const headers = req.headers['authorization'];
    const userId = jwthandle.getUserId(headers);
    // Define params (= table posts)
    const title = req.body.title;
    const content = req.body.content;
    const attachment = req.body.attachment;
    const likes = req.body.likes;

    // Check required fields to valid creation
    if (title === null || attachment === null) {
        return res.status(400).json({
            error: 'Empty input field'
        });
    }

    // Identify post owner
    models.User.findByPk(userId)
        .then(user => {
            console.log(user);
            if (!user) {  // if can not find user
                return res.status(401).json({ error: 'User not found in database' });
            }
            const newPost = models.Post.create({
                UserId: user.id, // = id post owner
                title: title,
                content: content,
                attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                likes: likes // default value = 0
            })
                .then(() => res.status(201).json({
                    message: 'Post created with success!',
                    userId, title
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


// ---------- Access to All posts : use getAllPosts function ----------
exports.getAllPosts = (req, res, next) => {

    const User = models.User;

    models.Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [ // retrieve information from another table here
            {
                model: User,
                attributes: ['username', 'avatar']
            }]
    })
        .then(posts => {
            console.log(posts);
            res.status(200).json({ posts });
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({ error: 'Retrieval posts failed' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Server error' })
        })
};


// ---------- Access to One post : use getOnePost function ----------
exports.getOnePost = (req, res, next) => {

    const User = models.User;

    models.Post.findOne({
        where: { id: req.params.id },
        include: [ // retrieve information from another table here too
            {
                model: User,
                attributes: ['username']
            }]
    })
        .then(post => {
            console.log(post);
            res.status(200).json({ post })
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({ error: 'Retrieval post failed' })
        })
};


// ---------- Update post: use updatePost function ----------
exports.updatePost = (req, res, next) => {

    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const attachment = req.body.attachment;

    models.Post.findByPk(id)
        .then(post => {
            console.log(post);
            if (!post) {  // if can not find post
                return res.status(401).json({ error: 'Post not found' });
            }
            // Check required fields to valid update action
            if (title === null || attachment === null) {
                return res.status(400).json({
                    error: 'Empty input field'
                });
            }
            post.update({
                title: title,
                content: content,
                attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            })
                .then(() => res.status(200).json({
                    message: 'Post now updated with success!',
                    id, title
                }))
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'Post update failed' })
                })
                .catch(error => {
                    console.log(error.response)
                    res.status(500).json({ error: 'Server error' })
                })
        })
        
};


// ---------- Remove post from platform: use deletePost function calling 'destroy' ----------
exports.deletePost = (req, res, next) => {

    const id = req.params.id;

    models.Post.findOne({
        where: { id: id }
    })
        .then(post => {
            console.log(post);
            if (!post) {  // if can not find post
                return res.status(401).json({ error: 'Deletion not possible' });
            }
            // Handle attachment file
            const filename = post.attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { // use fs.unlink() function to delete file
                models.Post.destroy({ where: { id: req.params.id } })
                return res.status(200).json({ message: 'Post destroyed, attachment remove from database and in local' })
            })
            .catch(error => {
                console.log(error)
                res.status(400).json({ error: 'Post deletion failed' })
            })
            .catch(error => {
                console.log(error.response)
                res.status(500).json({ error: 'Server error' })
            })
        })
}