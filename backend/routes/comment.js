// Configure comments routes

// Import express
const express = require('express');

// Create router: use router() function from Express
const router = express.Router();

// Import authentication middleware > protect routes
const auth = require('../middlewares/auth');

// Create controller > associate functions to different routes
const comCtrl = require('../controllers/comment');

// Comment routes
// Create comment
router.post('/new', auth, comCtrl.createComment);
// Access to all comments
//router.get('/', auth, comCtrl.getAllComments);
// Access to one comment
//router.get('/:id', auth, comCtrl.getOneComment);
// Delete comment
//router.delete('/:id', auth, comCtrl.deleteComment);

// Export the router (imported in app)
module.exports = router;