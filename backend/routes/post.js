// Configure users authentification routes

// Import express
const express = require('express');

// Create router: use router() function from Express
const router = express.Router();

// Import authentication middleware > protect routes
const auth = require('../middlewares/auth');

// Create controller > associate functions to different routes
const postCtrl = require('../controllers/post');

// Post routes
// Create post
router.post('/new', auth, postCtrl.createPost);


// Export the router (imported in app)
module.exports = router;