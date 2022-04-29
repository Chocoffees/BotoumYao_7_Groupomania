'use strict';

// Create a Comment model to represent comments table in database Groupomania
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});

  // Comment refer to 1 post
  // Referencing table comments (postId) to posts table (id)
  // has owner: 
  // Referencing table comments (userId) to users table (id)
  Comment.associate = function (models) {
    // define association
    Comment.belongsTo(models.Post);
    Comment.belongsTo(models.User);

    models.User.belongsToMany(models.Post, {
      through: models.Comment,
      foreignKey: 'userId',
      otherKey: 'postId',
    });

    models.Post.belongsToMany(models.User, {
      through: models.Comment,
      foreignKey: 'postId',
      otherKey: 'userId',
    });
  };

  return Comment;
};