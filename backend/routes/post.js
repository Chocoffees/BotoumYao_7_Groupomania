// Configure users authentification routes

// Import express
const express = require('express');

// Create router: use router() function from Express
const router = express.Router();

// Import authentication middleware > protect routes
const auth = require('../middlewares/auth');

// Import multer middleware > handle images uploaded
const multer = require('../middlewares/multer-config');

// Create controller > associate functions to different routes
const postCtrl = require('../controllers/post');

// Post routes
// Create post
router.post('/new', auth, multer, postCtrl.createPost);
// Access to all posts
router.get('/', auth, multer, postCtrl.getAllPosts);
// Access to one post
router.get('/:id', auth, multer, postCtrl.getOnePost);
// Update post
router.put('/:id', auth, multer, postCtrl.updatePost);
// Delete post
router.delete('/:id', auth, postCtrl.deletePost);

// Export the router (imported in app)
module.exports = router;