// Import Express
const express = require('express');

// Create Express application
const app = express();

// Middleware which analyse json requests 
app.use(express.json());

// Export the application
module.exports = app;