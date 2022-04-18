'use strict';

// Create an User model to represent users table in database Groupomania
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    service: DataTypes.STRING,
    avatar: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {});
  
  // User can have several posts (1:n)
  User.associate = function(models) {
        // define association
        User.hasMany(models.Post);
      };
    
  return User;
};