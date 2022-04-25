'use strict';

// Create a Post model to represent posts table in database Groupomania
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id_post_owner: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    title: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});  
  
  // Post have owner
  // Referencing table posts (id_post_owner) to users table (id)
  Post.associate = function(models) {
    // define associations
    Post.belongsTo(models.User);
    Post.hasMany(models.Comment);
  };

  return Post;
};