// Import Express
const express = require('express');

// Import routers
const userRoutes = require('./routes/user');

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

// Save routes
app.use('/api/user', userRoutes);

// Export the application
module.exports = app;