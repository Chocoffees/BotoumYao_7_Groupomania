// Configure likes routes

// Import express
const express = require('express');

// Create router: use router() function from Express
const router = express.Router();

// Import authentication middleware > protect routes
const auth = require('../middlewares/auth');

// Create controller > associate functions to different routes
const likeCtrl = require('../controllers/like');

// Like route
// Like a post -- identify post to be like
router.post('/posts/:postId', auth, likeCtrl.likePost);

// Export the router (imported in app)
module.exports = router;