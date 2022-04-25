// Configure users authentification routes

// Import express
const express = require('express');

// Create router: use router() function from Express
const router = express.Router();

// Import authentication middleware > protect routes
const auth = require('../middlewares/auth');

// Create controller > associate functions to different routes
const userCtrl = require('../controllers/user');

// Create signup/login routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Get one user
router.get('/:id', auth, userCtrl.getOneUser); // myaccount
// Update user data
router.put('/:id', auth, userCtrl.updateOneUser); // myaccount-update
// Delete user account > remove from database
router.delete('/:id', auth, userCtrl.deleteUser); // myaccount-delete

// Export the router (imported in app)
module.exports = router;