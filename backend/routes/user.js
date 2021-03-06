// Configure users authentification routes

// Import express
const express = require('express');

// Create router: use router() function from Express
const router = express.Router();

// Import authentication middleware > protect routes
const auth = require('../middlewares/auth');

// Import multer middleware > handle images uploaded
const multer = require('../middlewares/multer-config_user');

// Create controller > associate functions to different routes
const userCtrl = require('../controllers/user');

// Create signup/login routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Get one user
router.get('/myaccount/:id', auth, userCtrl.getOneUser);
// Update user data
router.put('/myaccount-update/:id', auth, multer, userCtrl.updateOneUser);
// Delete user account > remove from database
router.delete('/myaccount/:id', auth, userCtrl.deleteUser);
// Get all users
router.get('/', auth, userCtrl.getAllUsers);

// Export the router (imported in app)
module.exports = router;