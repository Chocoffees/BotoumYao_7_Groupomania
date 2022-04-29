// Import Express
const express = require('express');

// Import Node 'path' module > give access to the path of our file system
const path = require('path');

// Import routers
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// Create Express application
const app = express();

// Middleware which analyse json requests/parse incoming req
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true })); // string

/*test route
app.get('/', (req, res) => {
    res.json({ message: "test OK!" });
});*/

// Security CORS: add middleware applicable to all routes, requests to server // CORS: prevent malicious requests
app.use((req, res, next) => {
    // Allow to access a resource > any origin '*'
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Headers authorized for requests
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Allow following mentionned methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Set middleware > specify folder in charge to serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Save routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Export the application
module.exports = app;