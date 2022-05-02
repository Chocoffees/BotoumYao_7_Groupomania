// Configure comments routes

// Import express
const express = require('express');

// Create router: use router() function from Express
const router = express.Router();

// Import authentication middleware > protect routes
const auth = require('../middlewares/auth');

// Create controller > associate functions to different routes
const comCtrl = require('../controllers/comment');

// ------- In this version: clarify routes to identify post ------- 
// Comment routes
// Create comment -- identify post to be commented
router.post('/post/:postId', auth, comCtrl.createComment);
// Access to all comments
router.get('/post/:postId', auth, comCtrl.getAllComments);
// Access to one comment - necessary?
//router.get('/:id', auth, comCtrl.getOneComment);
// Delete comment
router.delete('/post/:id', auth, comCtrl.deleteComment);

// Export the router (imported in app)
module.exports = router;