// Handle authentication and authorization

// Import jsonwebtoken
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  // Generate token specificated to each user
  generateToken: function (user) {
    return jwt.sign(
      {
        userId: user.id, // object to serialize
      },
      process.env.RANDOM_TOKEN_SECRET,
      {
        expiresIn: "1h" // configuration > apply access token expiration delay (user can reconnect after "")
      }
    );
  },
  parseAuthorization: function (authorization) { // analyse data syntax of key Authorization > get token
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },
  getUserId: function (authorization) {
    const token = authorization.split(' ')[1];
    if (token != null) {
      try {
        // Decode and verify token: use verify() function
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);

        // Get userId
        userId = decodedToken.userId;
        return userId;
      }
      catch {
        res.status(401).json({
          error: new Error("Invalid request"),
        });
      }
    }
  },
};
