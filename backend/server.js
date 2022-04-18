// Create Node server

// Import Node HTTP package
const http = require('http');

// Import application 
const app = require('./app');

// Import 'dotenv' package
require('dotenv').config()

// Make sure that the port is valid: number or string
const normalizePort = val => {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Indicate PORT used
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

// errorhandler > search and manage errors
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const blind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(blind + ' requires elevated privileges.');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(blind + ' is already in use');
            process.exit(1);
            break;
            default:
                throw error;           
    }
};

// Create server that listens on port defined
const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// create a listener
server.listen(port);