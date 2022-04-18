'use strict';

// Create a Comment model to represent comments table in database Groupomania
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id_post_commented: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    content: DataTypes.STRING
  }, {});

  // Comment refer to 1 post
  // Referencing table comments (id_post_commented) to posts table (idpost)
  Comment.associate = function (models) {
    // define association
    Comment.belongsTo(models.Post);
  };

  return Comment;
};