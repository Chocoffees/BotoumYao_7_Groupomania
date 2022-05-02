'use strict';

// Create a Like model to represent likes table in database Groupomania
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    //id: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    }
  }, {});

  // Referencing table likes (userId) to users table (id)
  // Referencing table likes (postId) to posts table (id) 
  Like.associate = function (models) {
    // define association
    Like.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Like.belongsTo(models.Post, {
      foreignKey: 'postId'
    });
  };

  return Like;
};